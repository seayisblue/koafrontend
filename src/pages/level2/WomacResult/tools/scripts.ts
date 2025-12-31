import liuReq from "~/requests/liu-req";
import APIS from "~/requests/APIs";
import type { Womac } from "./types";
import { useWomacData } from "~/pages/level2/shared/useWomacData";

function constructWomac(): Womac {
  const womacDataOne = useWomacData(5, "one").womacData.questions;
  const womacDataTwo = useWomacData(2, "two").womacData.questions;
  const womacDataTri = useWomacData(16, "three").womacData.questions;
  const womac: Womac = {
    WOMAC: {
      pain: {
        walk: womacDataOne[0],
        stairs: womacDataOne[1],
        rest: womacDataOne[2],
        sitOrLie: womacDataOne[3],
        stand: womacDataOne[4],
      },
      stiffness: {
        awake: womacDataTwo[0],
        sleep: womacDataTwo[1],
      },
      difficulty: {
        downstair: womacDataTri[0],
        upstair: womacDataTri[1],
        standFromChair: womacDataTri[2],
        stand: womacDataTri[3],
        sitDown: womacDataTri[4],
        bendDown: womacDataTri[5],
        walk: womacDataTri[6],
        enterCar: womacDataTri[7],
        shopping: womacDataTri[8],
        wearOnSocks: womacDataTri[9],
        wearOffSocks: womacDataTri[10],
        getUpFromBed: womacDataTri[11],
        lieOnBed: womacDataTri[12],
        enterBathroom: womacDataTri[13],
        squat: womacDataTri[14],
        doHousework: womacDataTri[15],
      }
    }
  }
  return womac;
}

export function postWomac() {
  const url = APIS.METRICS_WOMAC_POST;
  const body = constructWomac();
  console.log(body);
  console.log(JSON.stringify(body));
  return liuReq.request(url, body);
}