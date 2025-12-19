import type { ImageShow } from "~/types"

type KoaStaticImageMap = Record<string, ImageShow>

const doctors: KoaStaticImageMap = {
  "hechengqi": {
    src: "/doctor01.png",
    id: "hechengqi",
    width: 1305,
    height: 795,
  },
}

export function getImageConfig() {
  return {
    doctors,
  }
}

export type ImageConfig = ReturnType<typeof getImageConfig>
