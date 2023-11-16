import type { FC } from 'react';
import {Backdrop, Box, CircularProgress} from '@mui/material'

const Loading: FC<{loading: boolean}> = ({ loading = false }): JSX.Element => {
  if (loading) {
    return (
        <Box sx={{ display: 'flex' }}>
          <Backdrop
              sx={{ color: 'rgba(245,245,245,0.22)', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loading}
          >
            <CircularProgress sx={{ color: 'white' }}/>
          </Backdrop>
        </Box>
    )
  }
  else {
    return (
        <></>
    )
  }
};

export default Loading;
