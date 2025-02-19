import { theme } from "_theme";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeStateI } from "./ThemeTypes";
import { ThemeCodeSupportedT } from "_utils";

const initialState: ThemeStateI = {
  code: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeCodeSupportedT>) => {
      state.code = action.payload;
    },
    resetTheme: (state) => {
      state.code = initialState.code;
    },
  },
  extraReducers: (builder) => {},
});

export const selectors = {
  currentTheme: (state: { theme: ThemeStateI }) => state.theme.code,
};

export const { setTheme, resetTheme } = themeSlice.actions;

export default themeSlice;
