import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const Sign = ({ onRegistrationComplete }) => {
  const [Lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const role = 'customer';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Lastname || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('/users', {
        Lastname,
        email,
        role,
        password,
      });

      if (response.status === 201) {
        setLastname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');

        alert('Account created successfully!');
        navigate('/');
      }
    } catch (err) {
      setError('An error occurred while creating the account.');
    }
    onRegistrationComplete();
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: 'white',
        }}
      >
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Register
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Last Name"
          value={Lastname}
          onChange={(e) => setLastname(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <FormControlLabel
          control={<Checkbox />}
          label="I agree with the terms and conditions"
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, py: 1.5 }}
        >
          Register New Account
        </Button>
      </Box>
    </Container>
  );
};

export default Sign;
