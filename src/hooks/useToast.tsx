import { Snackbar, SnackbarProps } from '@mui/material'
import { ReactElement, useCallback, useState } from 'react'
import { SnackbarOrigin } from '@mui/material/Snackbar/Snackbar'

type ToastProps = {
  autoHideDuration?: SnackbarProps['autoHideDuration']
  children: ReactElement
  horizontal?: SnackbarOrigin['horizontal']
  isOpen: boolean
  onClose?: () => void
  vertical?: SnackbarOrigin['vertical']
}

export const useToast = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOnOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleOnClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const Toast = useCallback(
    ({ autoHideDuration = 2000, children, horizontal = 'center', isOpen, onClose, vertical = 'top' }: ToastProps) => {
      return (
        <Snackbar
          anchorOrigin={{ horizontal, vertical }}
          open={isOpen}
          autoHideDuration={autoHideDuration}
          onClose={onClose}
        >
          {children}
        </Snackbar>
      )
    },
    []
  )

  return [
    Toast,
    {
      handleOnClose,
      handleOnOpen,
      isOpen,
    },
  ] as const
}
