import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to localStorage
      localStorage.setItem('user', JSON.stringify(json));

      // update the authContext
      dispatch({
        type: 'LOGIN',
        payload: json,
      });

      setLoading(false);
      setError(null);
    }
  };

  return {
    login,
    error,
    loading,
  };
};
