import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthHeader from './AuthHeader';
import ReCAPTCHA from "react-google-recaptcha";
import AnimatedXPage from '../AnimatedXPage';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../services/utils';

const defaultTheme = createTheme();

export default function SignIn() {
  const { handleLogin, handleInputChange } = useAppContext();

  // input change
  const handleChange = (event) => {
    handleInputChange(event);
  }

  // submit
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <>
      <AuthHeader />
      <AnimatedXPage>
        <ThemeProvider theme={defaultTheme} className=''>
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
              <Typography component="h1" variant="h5">
                Welcome Back!
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                />

                <div className='flex justify-center items-center'>
                  <ReCAPTCHA
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                    // onChange={onRecaptchaCheck}
                  />
                </div>

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <NavLink to="/forgot-password" variant="body2">
                      Forgot password?
                    </NavLink>
                  </Grid>
                  <Grid item>
                    <NavLink to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </AnimatedXPage>
    </>
  );
};