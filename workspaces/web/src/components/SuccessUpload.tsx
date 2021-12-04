import Button from './Button'
import Card from './Card'
import CheckIcon from './CheckIcon'
import copy from 'copy-to-clipboard'
import { useState } from 'react'

export default function SuccessUpload({ fileName }: { fileName: string | null }) {
  const url = `${window.origin}/api/images/${fileName}`
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    setCopied(copy(url))
  }
  return (
    <Card className="items-center">
      <CheckIcon size={32} />
      <h1 className="font-poppins font-medium text-xl">Uploaded Successfully!</h1>
      {fileName && <img src={url} alt={fileName + ''} />}
      <div className="flex items-center border-gray-200 border-2 p-1 rounded-2xl bg-[#F6F8FB] w-full">
        {fileName && <p className="p-2 flex-1 truncate">{url}</p>}
        <Button className="text-sm rounded-2xl" onClick={onCopy}>
          {copied ? 'Copied!' : 'Copy Link'}
        </Button>
      </div>
    </Card>
  )
}
