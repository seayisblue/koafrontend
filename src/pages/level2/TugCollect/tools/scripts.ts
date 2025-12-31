import liuReq from "~/requests/liu-req";
import APIS from "~/requests/APIs";
import type { TugData, Metrics } from "./types";
import { KoaController } from "~/utils/controllers/KoaController";
import { ScoreController } from "~/utils/controllers/ScoreController";

function constructMetrics(): Metrics {
  const tugData = KoaController.getLevel2Data<TugData>("tug-collect");
  let time: number = 0;
  if (tugData !== undefined) time = Number(tugData.time) || 0;
  const metrics: Metrics = {
    metrics: {
      tugTime: time,
      womac: ScoreController.getWomac(),
      kl: ScoreController.getKL(),
      vas: ScoreController.getVas()
    }
  };
  return metrics;
}

export function postMetrics() {
  const url = APIS.METRICS_POST;
  const body = constructMetrics();
  return liuReq.request(url, body);
}
