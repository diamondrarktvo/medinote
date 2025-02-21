import config from "_config";
import { BaseApi } from "_services";
import { RoomT, VoiceT } from "./RecordingTypes";
import { ApiResponse } from "_utils";
import { Platform } from "react-native";

const RecordingApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllRoomsByDevice: build.query<
      RoomT[],
      {
        device_id: string;
      }
    >({
      query: ({ device_id }) => ({
        url: config.ROOM.GET + device_id,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<RoomT[]>): RoomT[] => {
        return response.data;
      },
      providesTags: ["Room"],
    }),
    getAllVoicesByRoom: build.query<
      VoiceT[],
      {
        room_id: number;
      }
    >({
      query: ({ room_id }) => ({
        url: config.VOICE.GET + room_id,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<VoiceT[]>): VoiceT[] => {
        return response.data;
      },
      providesTags: ["Recording"],
    }),
    createRoom: build.mutation<
      ApiResponse<RoomT>,
      {
        device_id: string;
        title: string;
      }
    >({
      query: (body) => ({
        url: config.ROOM.POST,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Room"],
    }),
    sendRecord: build.mutation<
      ApiResponse<VoiceT>,
      {
        audio: {
          uri: string;
          name: string;
          content_type: string;
        };
        roomId: number;
      }
    >({
      query: ({ audio, roomId }) => {
        //It's very necessary
        const audioUri =
          Platform.OS === "android" ? `file://${audio.uri}` : audio.uri;

        const bodyFormData = new FormData();
        //@ts-ignore
        bodyFormData.append("video", {
          uri: audioUri,
          name: audio.name,
          type: audio.content_type,
        });

        bodyFormData.append("room_id", roomId.toString());

        return {
          url: config.VOICE.POST,
          method: "POST",
          body: bodyFormData,
        };
      },
      invalidatesTags: ["Recording"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllRoomsByDeviceQuery,
  useGetAllVoicesByRoomQuery,
  useCreateRoomMutation,
  useSendRecordMutation,
} = RecordingApi;

export default RecordingApi;
