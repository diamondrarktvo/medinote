import config from "_config";
import { BaseApi } from "_services";

const RecordingApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: true,
});

export const {} = RecordingApi;

export default RecordingApi;
