import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export async function exchangeCodeForToken(code: string) {
    const params = new URLSearchParams();
    params.append('client_id', import.meta.env.VITE_UNSPLASH_CLIENT_ID);
    params.append('client_secret', import.meta.env.VITE_UNSPLASH_CLIENT_SECRET);
    params.append('redirect_uri', import.meta.env.VITE_UNSPLASH_REDIRECT_URI);
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

  return useQuery({
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



