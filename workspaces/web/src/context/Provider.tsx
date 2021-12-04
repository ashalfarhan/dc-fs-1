import { FC, useReducer } from 'react'
import { uploadReducer, initialState } from './reducer'
import { UploadContext } from './upload-context'

export const UploadProvider: FC = (props) => {
  const [state, dispatch] = useReducer(uploadReducer, initialState)
  const value = { state, dispatch }
  return <UploadContext.Provider value={value} {...props} />
}
