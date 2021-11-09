import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

const Callback = () => {
  const getUserData = async (code: string) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/user?code=${code}`;
    console.log(url);
    const response = await fetch(url);
    const userData = await response.json();
    console.log(userData);
  };
  const searchParams = new URLSearchParams(useLocation().search);
  const codeStr = searchParams.get('code');
  if (!codeStr) return <Redirect to="/" />;

  useEffect(() => {
    getUserData(codeStr);
  }, []);
  // context, JWT cookie 설정

  return <Redirect to="/rooms" />;
};

export default Callback;
