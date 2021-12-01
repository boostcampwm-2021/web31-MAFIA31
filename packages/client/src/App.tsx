import { useLayoutEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import Callback from './pages/Callback';
import Game from './pages/Game';
import GameResult from './pages/GameResult';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Waiting from './pages/Waiting';
import SocketProvider from './contexts/socket';
import SocketRoute from './components/Route/SocketRoute';
import { useUserInfo } from './contexts/userInfo';
import InjectAxiosInterceptors from './axios/InjectAxiosInterceptors.tsx';

const queryClient = new QueryClient();

const App = () => {
  const { userInfo, setUserInfo } = useUserInfo();
  const [cookies] = useCookies();

  useLayoutEffect(() => {
    if (!cookies.token) {
      setUserInfo(undefined);
    }
    if (!userInfo?.userName && cookies.token) {
      const token: { userName: string; profileImg: string } = jwtDecode(cookies.token);
      setUserInfo({
        userName: token.userName,
        profileImg: token.profileImg,
      });
    }
  }, []);

  const routes = userInfo?.userName ? (
    <Switch>
      <SocketRoute path="/profile" component={Profile} />
      <SocketRoute path="/rooms" component={Rooms} />
      <SocketRoute path="/waiting" component={Waiting} socket />
      <SocketRoute path="/game" component={Game} socket />
      <SocketRoute path="/game-result" component={GameResult} />
      <Route component={Rooms} />
    </Switch>
  ) : (
    <Switch>
      <SocketRoute exact path="/" component={Login} />
      <SocketRoute path="/callback" component={Callback} />
      <Route component={Login} />
    </Switch>
  );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <InjectAxiosInterceptors />
        <SocketProvider>{routes}</SocketProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
export default App;
