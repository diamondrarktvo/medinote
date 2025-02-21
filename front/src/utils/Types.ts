export type LanguageCodeSupportedT = "fr" | "en";
export type ThemeCodeSupportedT = "light" | "dark";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  data: { message: string; success: boolean };
  status: number;
}
