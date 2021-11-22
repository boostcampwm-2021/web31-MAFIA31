import { useUserInfo } from '@src/contexts/userInfo';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useCookie = () => {
  const { userInfo, setUserInfo } = useUserInfo();
  const [cookies] = useCookies();

  useEffect(() => {
    if (!userInfo?.userName && cookies.jwt) {
      const token = JSON.parse(atob(cookies.jwt.split('.')[1]));
      setUserInfo({
        userName: token.userName,
        profileImg: token.profileImg,
      });
    }
  }, [userInfo]);
};

export default useCookie;
