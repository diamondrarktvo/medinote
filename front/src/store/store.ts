import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { BaseApi } from "_services";
import { themeSlice } from "../features/theme";

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    [themeSlice.name]: themeSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BaseApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.getState;
export type RootState = ReturnType<typeof store.getState>;
