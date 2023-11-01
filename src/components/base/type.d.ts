import React, { CSSProperties } from 'react'

export interface BaseComponent {
  className?: string
  style?: CSSProperties
  customStyle?: string | CSSProperties
  children?: React.ReactNode
}
