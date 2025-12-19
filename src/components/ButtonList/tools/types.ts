

export interface ButtonListProps {
  mainTextKey?: string
  subTextKey?: string
}

export interface ButtonListEmits {
  (e: "next"): void
  (e: "back"): void
}