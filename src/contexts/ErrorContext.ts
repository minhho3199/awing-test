import { createContext } from "react";
import { Error } from "../types/error";

export const ErrorContext = createContext<Error>({
  campaignNameError: "",
  subCampaignNameError: "",
})