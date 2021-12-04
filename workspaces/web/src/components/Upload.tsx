import { useCallback } from 'react'
import Button from './Button'
import Card from './Card'
import Placeholder from './Placeholder'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { useUpload } from '../context/upload-context'
import { upload } from '../utils/upload'
import { sleep } from '../utils/sleep'

const Upload = () => {
  const { dispatch } = useUpload()
  const onDrop = useCallback(async (files: File[]) => {
    if (files.length === 0) return toast.error('Should only be Jpeg or Png, and other image format')
    dispatch({ type: 'upload/loading' })
    const form = new FormData()
    form.append('file', files[0])
    try {
      await sleep(800)
      const result = await upload(form)
      dispatch({ type: 'upload/success', payload: result.fileName })
    } catch (error) {
      dispatch({ type: 'upload/fail', payload: error })
      toast.error(error.message)
      console.error(error)
    }
  }, [])
  const { getInputProps, getRootProps, open } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'image/png'],
  })
  return (
    <Card className="h-[469px] items-center">
      <h1 className="font-poppins text-lg">Upload your image</h1>
      <div className="font-poppins text-gray-500 text-xs">File should be Jpeg, Png,...</div>
      <div
        {...getRootProps({
          className:
            'flex flex-col items-center justify-center space-y-4 self-stretch border-2 border-blue-400 border-dashed rounded-xl p-8 bg-[#F6F8FB]',
        })}
      >
        <Placeholder />
        <input {...getInputProps({ className: 'hidden' })} />
        <p className="font-sm font-poppins text-gray-500">Drag &amp; Drop your image here</p>
      </div>
      <div className="font-sm font-poppins text-gray-500">Or</div>
      <Button onClick={open}>Choose a file</Button>
    </Card>
  )
}

export default Upload
