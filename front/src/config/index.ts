export default {
  //url de base
  BASE_URL: process.env.EXPO_PUBLIC_API_HOST_URL + "/api/v1",

  ROOM: {
    GET: "/room?device_id=",
    POST: "/room",
  },
  VOICE: {
    POST: "/voice",
    GET: "/voice?room_id=",
  },
};
