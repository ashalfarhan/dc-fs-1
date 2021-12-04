export type UploadState = {
  status: 'error' | 'success' | 'pending' | 'idle'
  fileName: string | null
  error: Error | string | null
}

export type UploadAction =
  | { type: 'upload/loading' }
  | { type: 'upload/success'; payload: string }
  | { type: 'upload/fail'; payload: Error | string }
