import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import SkeletonRoomContainer from '@src/components/Skeleton/SkeletonRoomContainer';
import Header from '@src/templates/Header';

const Callback = () => {
  const { setUserInfo } = useUserInfo();
  const history = useHistory();

  const getUserData = async (code: string) => {
    const url = `${process.env.REACT_APP_API_URL}/api/auth/user?code=${code}`;
    const response = await fetch(url, { credentials: 'include' });
    const userData = await response.json();
    setUserInfo(userData);
    history.push('/');
  };
  const searchParams = new URLSearchParams(useLocation().search);
  const codeStr = searchParams.get('code');
  if (!codeStr) return <Redirect to="/" />;

  useEffect(() => {
    getUserData(codeStr);
  }, []);
  // context, JWT cookie 설정

  return (
    <>
      <Header skeleton />
      <SkeletonRoomContainer />
    </>
  );
};

export default Callback;
