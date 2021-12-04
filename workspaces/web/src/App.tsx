import SuccessUpload from './components/SuccessUpload'
import Upload from './components/Upload'
import Uploading from './components/Uploading'
import { useUpload } from './context/upload-context'

function App() {
  const { state } = useUpload()
  return (
    <div className="max-w-[100vw] min-h-[100vh] flex items-center justify-center">
      {state.status === 'pending' ? (
        <Uploading />
      ) : state.status === 'idle' ? (
        <Upload />
      ) : state.status === 'success' ? (
        <SuccessUpload fileName={state.fileName} />
      ) : (
        <span>Something went wrong</span>
      )}
    </div>
  )
}

export default App
