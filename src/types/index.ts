import type { 
  RouteLocation, 
  RouteLocationNormalized, 
  RouteLocationResolvedGeneric,
} from 'vue-router'

/********************* About Routes *********************/
export type RouteItem = RouteLocationResolvedGeneric | RouteLocationNormalized

export type ToRoute = RouteLocation & { href: string }

export interface ImageShow {
  src: string
  id: string
  width?: number
  height?: number
  h2w?: string
  blurhash?: string
}