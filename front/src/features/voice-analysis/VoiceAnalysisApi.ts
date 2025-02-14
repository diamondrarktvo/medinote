import config from "_config";
import { BaseApi } from "_services";

type deleteProps = { id: number; token: string };
type addProps = deleteProps;

const weatherApi = BaseApi.injectEndpoints({
  endpoints: (build) => ({}),
  overrideExisting: true,
});

export const {} = weatherApi;

export default weatherApi;
