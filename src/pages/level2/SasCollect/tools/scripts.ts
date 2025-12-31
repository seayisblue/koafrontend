import liuReq from "~/requests/liu-req";
import APIs from "~/requests/APIs";
import type { SasData, SAS } from "./types";

function constructSAS(sasData: SasData): SAS {
  const sas: SAS = {
    SAS: sasData.list.map(item => item.selected_idx === -1 ? 0 : item.selected_idx)
  }
  return sas;
}

export function postSAS(sasData: SasData) {
  const url = APIs.METRICS_SAS_POST;
  const body = constructSAS(sasData);
  return liuReq.request(url, body);
}