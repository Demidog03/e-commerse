import {
  IconButton
} from '@mui/material'
import { memo } from 'react'
import {
  toast,
  Toaster as DefaultToaster,
  ToastBar
} from 'react-hot-toast'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'

export const Toaster = memo(() => {
  const handleClose = (id: string): void => {
    toast.dismiss(id)
  }
  return (
      <DefaultToaster position="top-right">
        {(t) => (
            <ToastBar
                toast={t}
                style={{ width: '100%', background: 'white', color: '#313033' }}
            >
              {({ icon, message }) => (
                  <>
                    {icon}
                    <Typography>
                      {message}
                    </Typography>
                    {t.type !== 'loading' && (
                        <IconButton onClick={handleClose.bind(this, t.id)}>
                          <CloseIcon />
                        </IconButton>
                    )}
                  </>
              )}
            </ToastBar>
        )}
      </DefaultToaster>
  )
})
