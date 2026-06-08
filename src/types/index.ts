export type ObservationStatus = 'idle' | 'observing'

export interface Capture {
  id: string
  text: string
  pageTitle: string
  url: string
  timestamp: number
  favicon?: string
}

export type Message =
  | { type: 'SELECTION_CHANGED'; text: string; pageTitle: string; url: string }
  | { type: 'ADD_CAPTURE'; capture: Capture }
  | { type: 'GET_CAPTURES' }
  | { type: 'DELETE_CAPTURE'; id: string }
  | { type: 'CLEAR_ALL' }
  | { type: 'SET_ACTIVE'; active: boolean }
