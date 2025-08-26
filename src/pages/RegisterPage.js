import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Typography, TextField, Button, Box, MenuItem, CircularProgress, Alert
} from '@mui/material';
import { register } from '../features/userActions'; // <-- IMPORT THE ACTION

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user state from Redux
  const userRegister = useSelector((state) => state.user);
  const { loading, error, userInfo } = userRegister;

  // Redirect if user is already logged in or after successful registration
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home page
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage('');
      // Dispatch the register action
      dispatch(register(name, email, password, role));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {message && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
        {loading && <CircularProgress sx={{ mt: 2 }} />}
        <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
          {/* ... all TextField components remain the same ... */}
          <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Full Name" name="name" autoComplete="name" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <TextField variant="outlined" margin="normal" required fullWidth name="confirmPassword" label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <TextField select label="Role" value={role} onChange={(e) => setRole(e.target.value)} fullWidth margin="normal">
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Instructor">Instructor</MenuItem>
          </TextField>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;