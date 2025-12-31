

export interface WrData {
  womacScore: number;
  klScore: number;  // 0: no result; 1-4: KL score
  score: number;  // overall score
}

export interface Womac {
  WOMAC: {
    pain: {
      walk: number,
      stairs: number,
      rest: number,
      sitOrLie: number,
      stand: number,
    },
    stiffness: {
      awake: number,
      sleep: number,
    },
    difficulty: {
      downstair: number,
      upstair: number,
      standFromChair: number,
      stand: number,
      sitDown: number,
      bendDown: number,
      walk: number,
      enterCar: number,
      shopping: number,
      wearOnSocks: number,
      wearOffSocks: number,
      getUpFromBed: number,
      lieOnBed: number,
      enterBathroom: number,
      squat: number,
      doHousework: number,
    }
  }
}