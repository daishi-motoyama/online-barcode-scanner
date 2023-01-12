import { useState } from 'react'
import { Scanner } from './Scanner'
import { useCopyToClipboard } from 'react-use'
import { Alert, Box, Button, Container, Stack, TextField, useMediaQuery, useTheme } from '@mui/material'
import { useToast } from '../hooks/useToast'

export const App = () => {
  const [codes, setCodes] = useState<string[]>([])
  const [, copyToClipboard] = useCopyToClipboard()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [Toast, { handleOnClose, handleOnOpen, isOpen }] = useToast()

  return (
    <Container>
      {matches ? (
        <Box display={'flex'} gap={2}>
          <Box flex={1}>
            <Scanner
              onReadCode={(result) => {
                setCodes((codes) => Array.from(new Set([...codes, result.getText()])))
                handleOnOpen()
              }}
            />
          </Box>
          <Stack width={300} spacing={2}>
            <TextField fullWidth multiline rows={10} value={codes.join('\n')} />
            <Button variant={'contained'} fullWidth onClick={() => copyToClipboard(codes.join('\n'))}>
              コピー
            </Button>
          </Stack>
        </Box>
      ) : (
        <Stack spacing={2}>
          <Scanner
            onReadCode={(result) => {
              setCodes((codes) => Array.from(new Set([...codes, result.getText()])))
              handleOnOpen()
            }}
          />
          <TextField fullWidth multiline rows={5} value={codes.join('\n')} />
          <Button variant={'contained'} fullWidth onClick={() => copyToClipboard(codes.join('\n'))}>
            コピー
          </Button>
        </Stack>
      )}
      <Toast isOpen={isOpen} onClose={handleOnClose}>
        <Alert onClose={handleOnClose} severity={'success'} sx={{ width: '100%' }}>
          バーコードの読み取りに成功しました！
        </Alert>
      </Toast>
    </Container>
  )
}
