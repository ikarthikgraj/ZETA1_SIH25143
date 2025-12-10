#include <Arduino.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_ADS1X15.h>
#include <MPU6050.h>

// ------------------ I2C PINS ------------------
#define SDA_PIN 21
#define SCL_PIN 22

// ------------------ OBJECTS -------------------
Adafruit_ADS1115 ads48;   // Address 0x48
Adafruit_ADS1115 ads49;   // Address 0x49
MPU6050 imu;

// ------------------ FLAGS ---------------------
bool ads48_ok = false;
bool ads49_ok = false;
bool imu_ok   = false;

// ------------------ ADS PARAMETERS ------------
const float VCC = 3.3;
const float R_PULLDOWN = 10000.0;
float LSB = 4.096 / 32768.0;   // For GAIN_ONE

// ------------------ I2C SCAN ------------------
void i2cScan() {
  Serial.println("\nI2C SCAN:");
  for (uint8_t addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.printf("  Found device at 0x%02X\n", addr);
    }
  }
  Serial.println();
}

// ------------------ FSR RESISTANCE ------------
float computeFSRResistance(float vOut) {
  if (vOut <= 0.00001) return INFINITY;
  return R_PULLDOWN * (VCC - vOut) / vOut;
}

// ------------------ READ ADS ------------------
void readADS(Adafruit_ADS1115 &ads, uint8_t addr) {
  Serial.printf("\nADS1115 @ 0x%02X\n", addr);

  for (int ch = 0; ch < 4; ch++) {
    int16_t raw = ads.readADC_SingleEnded(ch);
    float voltage = raw * LSB;

    Serial.printf(" A%d = %6d  (%.4f V)", ch, raw, voltage);

    if (raw == 0)
      Serial.print("  [ZERO / NO PRESSURE]");
    Serial.println();

    if (ch == 0) {
      float rfsr = computeFSRResistance(voltage);
      if (isfinite(rfsr))
        Serial.printf("  -> R_FSR = %.0f ohms\n", rfsr);
      else
        Serial.println("  -> R_FSR = Infinite (No Pressure)");
    }
  }
}

// ------------------ READ IMU ------------------
void readIMU() {
  if (!imu_ok) return;

  int16_t ax, ay, az, gx, gy, gz;
  imu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  float ax_g = ax / 16384.0;
  float ay_g = ay / 16384.0;
  float az_g = az / 16384.0;

  float gx_dps = gx / 131.0;
  float gy_dps = gy / 131.0;
  float gz_dps = gz / 131.0;

  Serial.println("\nIMU (MPU6050/6500):");
  Serial.printf(" Accel (g):  X=%.2f  Y=%.2f  Z=%.2f\n", ax_g, ay_g, az_g);
  Serial.printf(" Gyro (dps): X=%.2f  Y=%.2f  Z=%.2f\n", gx_dps, gy_dps, gz_dps);
}

// ------------------ SETUP ---------------------
void setup() {
  Serial.begin(115200);
  delay(300);

  Serial.println("\nSMART INSOLE : ESP32 + ADS1115 + IMU\n");

  Wire.begin(SDA_PIN, SCL_PIN);
  delay(200);

  i2cScan();

  // -------- ADS 0x48 --------
  if (ads48.begin(0x48)) {
    ads48_ok = true;
    ads48.setGain(GAIN_ONE);
    Serial.println("ADS1115 @ 0x48 OK");
  } else {
    Serial.println("ADS1115 @ 0x48 NOT FOUND");
  }

  // -------- ADS 0x49 --------
  if (ads49.begin(0x49)) {
    ads49_ok = true;
    ads49.setGain(GAIN_ONE);
    Serial.println("ADS1115 @ 0x49 OK");
  } else {
    Serial.println("ADS1115 @ 0x49 NOT FOUND");
  }

  // -------- IMU MANUAL DETECTION --------
  imu.initialize();

  Wire.beginTransmission(0x68);
  Wire.write(0x75);   // WHO_AM_I register
  Wire.endTransmission(false);
  Wire.requestFrom((uint8_t)0x68, (uint8_t)1);

  if (Wire.available()) {
    uint8_t whoami = Wire.read();
    Serial.printf("IMU WHO_AM_I = 0x%02X\n", whoami);

    // Accept ALL valid MPU variants
    if (whoami == 0x68 || whoami == 0x70 || whoami == 0x71) {
      imu_ok = true;
      Serial.println("IMU OK (MPU6050/6500 variant detected)");
    } else {
      Serial.println("IMU detected but WHO_AM_I is unknown!");
    }
  } else {
    Serial.println("IMU not responding on WHO_AM_I!");
  }

  Serial.println("\nSYSTEM READY\n");
}

// ------------------ LOOP ---------------------
void loop() {

  if (ads48_ok) readADS(ads48, 0x48);
  if (ads49_ok) readADS(ads49, 0x49);

  if (imu_ok) readIMU();

  Serial.println("\n-------------------------------------------\n");
  delay(1200);
}
