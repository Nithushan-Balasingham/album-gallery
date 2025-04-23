import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { exchangeCodeForToken } from '../hooks/useUser';
import { setAccessToken } from '../store/slices/authSlice';
import { Button, Stack, TextField } from '@mui/material';
import { toast } from 'react-toastify';

export const AuthButton = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');

  const handleAuth = async () => {
    try {
      const data = await exchangeCodeForToken(code);
      dispatch(setAccessToken(data.access_token));
      toast.success('Authenticated!', { autoClose: 2000 });
      
      setCode("")
    } catch (error) {
      console.error(error);
      toast.warn('Auth failed.');
    }
  };

  return (
    <Stack direction={"column"} margin={4} spacing={2}>
      <TextField
        type="text"
        placeholder="Paste code here"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border p-2 mr-2"
      />
      <Button variant='contained' onClick={handleAuth} className="bg-blue-500 text-white px-4 py-2 rounded">
        Authenticate
      </Button>
    </Stack>
  );
};
