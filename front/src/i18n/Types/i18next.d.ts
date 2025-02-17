import "i18next";
import { DEFAULT_NS } from "../constant";
import { Locales } from "../locales";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: typeof Locales.fr;
  }
}
