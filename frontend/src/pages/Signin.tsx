import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useDispatch} from 'react-redux'
import {signin} from '../store/auth/auth.slice.ts'
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState<{username: string, password: string}>({username: '', password: ''})
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('username'))
    console.log(data.get('password'))
    setError({username: '', password: ''})
    if(!data.get('username')) {
      setError(prevState => (
        {
          ...prevState,
          username: 'Username is required'
        }
      ))
      return
    }
    if(!data.get('password')) {
      setError(prevState => ({
        ...prevState,
        password: 'Password is required'
      }))
      return
    }
    dispatch(signin({
      username: data.get('username') as string,
      password: data.get('password') as string
    }))
  };
  // @ts-ignore
  const navigateToSignUp = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate('/signup')
  }

  useEffect(() => {
    console.log(error)
  }, [error])

  return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  error={!!error.username}
                  helperText={error.username}
                  autoFocus
              />
              <TextField
                  color="secondary"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!error.password}
                  helperText={error.password}
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="" variant="body2" onClick={navigateToSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
  );
}
