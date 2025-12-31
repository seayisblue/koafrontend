export interface TugData {
  videoSrc: string
  time: number
}

export interface Metrics {
  metrics: {
    tugTime: number;
    womac: number;
    kl: number;
    vas: number;
  }
}
