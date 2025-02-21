import * as Device from "expo-device";

export async function getDeviceId() {
  try {
    const deviceId = Device.osBuildId;

    if (deviceId) {
      return deviceId;
    } else {
      console.log("Could not retrieve device ID.");
      return null;
    }
  } catch (error) {
    console.error("Error getting device ID:", error);
    return null;
  }
}
