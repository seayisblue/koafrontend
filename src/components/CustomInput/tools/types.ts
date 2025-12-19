import type { InputTypeHTMLAttribute } from "vue"

export interface CustomInputProps {
  maxlength?: number
  placeholder?: string
  type?: InputTypeHTMLAttribute
  
  min?: string
  max?: string
}