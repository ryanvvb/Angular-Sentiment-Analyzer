import { InjectionToken } from "@angular/core";
import { NgGCCongig } from "../types";

export const NGGC_API_CONFIG = new InjectionToken<NgGCCongig>(
  'NGGC_API_CONFIG',
);
