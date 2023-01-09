import { useState } from 'react'
import { Scanner } from './Scanner'
import { useCopyToClipboard } from 'react-use'

export const App = () => {
  const [codes, setCodes] = useState<string[]>([])
  const [, copyToClipboard] = useCopyToClipboard()

  return (
    <>
      <Scanner
        onReadCode={(result) => {
          setCodes((codes) => [...codes, result.getText()])
        }}
      />
      <div>
        <textarea style={{ height: 300 }} readOnly value={codes.join('\n')} />
        <button type={'button'} onClick={() => copyToClipboard(codes.join('\n'))}>
          コピー
        </button>
      </div>
    </>
  )
}
