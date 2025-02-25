import OpenAI from "openai";
import { env } from "./env";

export const openai = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: env.GITHUB_TOKEN,
});
