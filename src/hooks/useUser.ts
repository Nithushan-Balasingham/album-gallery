import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser, setUsername } from '../store/slices/authSlice';

export async function exchangeCodeForToken(code: string) {
    const params = new URLSearchParams();
    params.append('client_id', import.meta.env.VITE_ACCESS_KEY);
    params.append('client_secret', import.meta.env.VITE_SECRET_KEY);
    params.append('redirect_uri', import.meta.env.VITE_REDIRECT_URI);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
  
    const res = await fetch('https://unsplash.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
  
    if (!res.ok) throw new Error('Failed to exchange code for token');
    return res.json();
  }
  

  export function useUnsplashUser() {
    const token = useSelector((state: RootState) => state.auth.accessToken);
    const dispatch = useDispatch();
  
    const query = useQuery({
      queryKey: ['unsplashUser'],
      queryFn: async () => {
        const res = await fetch('https://api.unsplash.com/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch user info');
        return res.json();
      },
      enabled: !!token,
    });
  
    useEffect(() => {
      if (query.data?.username && query.data?.id) {
        dispatch(setUser({ username: query.data.username, id: query.data.id }));
      }
    }, [query.data, dispatch]);
    
    return query;
  }

export function useUserCollections(username?: string) {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useQuery({
    queryKey: ['userCollections', username],
    queryFn: async () => {
      const res = await fetch(`https://api.unsplash.com/users/${username}/collections`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch collections');
      return res.json();
    },
    enabled: !!token && !!username,
  });
}



