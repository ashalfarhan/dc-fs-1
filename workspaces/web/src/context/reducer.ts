import { UploadAction, UploadState } from './types'

export const initialState: UploadState = {
  fileName: null,
  error: null,
  status: 'idle',
}

export function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case 'upload/success':
      return {
        ...state,
        error: null,
        status: 'success',
        fileName: action.payload,
      }
    case 'upload/fail':
      return {
        ...state,
        status: 'error',
        error: action.payload,
        fileName: null,
      }
    case 'upload/loading':
      return {
        ...state,
        status: 'pending',
      }
    default:
      return state
  }
}
