import { useState } from "react";
import { IconButton, InputAdornment, Stack, TextField, Link, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

const SignUpForm = ({ registerUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Stack spacing={3} sx={{ mb: 2 }}>
        <TextField
          name="name"
          label="Full Name"
          value={name}
          required
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          name="email"
          label="Email address"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          name="password"
          required
          label="Password"
          value={password}
          type={showPassword ? 'text' : 'password'}
          onChange={(event) => setPassword(event.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography variant="body2" sx={{ mb: 5, mt: 3 }} textAlign="center">
        Already have an account?{' '}
        <Link href="/login" variant="subtitle2">Sign in</Link>
      </Typography>

      <LoadingButton
        sx={{ mt: 4 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => registerUser(name, email, password)}
      >
        Sign Up
      </LoadingButton>
    </>
  );
};

SignUpForm.propTypes = {
  registerUser: PropTypes.func,
};

export default SignUpForm;
