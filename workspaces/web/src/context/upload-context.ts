import { createContext, Dispatch, useContext } from 'react'
import { UploadAction, UploadState } from './reducer'

export const UploadContext = createContext<UploadContextValues | undefined>(undefined)

export type UploadContextValues = {
  dispatch: Dispatch<UploadAction>
  state: UploadState
}

export const useUpload = () => {
  const ctx = useContext(UploadContext)
  if (!ctx) throw new Error('`useUpload` should be called inside UploadProvider')
  return ctx
}
