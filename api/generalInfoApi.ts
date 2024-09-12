// import httpClient from "@/api/httpClient";

import axios from "axios";
import type { GeneralInfo } from "../interfaces/GeneralInfo";
import { getBaseApiUrl } from "./getBaseApiUrl";

const getGeneralInfo = (locale: string): Promise<GeneralInfo> => {
  const baseUrl = getBaseApiUrl(locale);
  return axios
    .get(`${baseUrl}/wp-json/ng/v1/events_main_info`)
    .then((resp) => resp.data);
};

export { getGeneralInfo };
