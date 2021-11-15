import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Callback from './pages/Callback';
import Game from './pages/Game';
import GameResult from './pages/GameResult';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Waiting from './pages/Waiting';
import UserInfoProvider from './contexts/userInfo';
import SocketProvider from './contexts/socket';

const App = () => (
  <Router>
    <SocketProvider>
      <UserInfoProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/callback" component={Callback} />
          <Route path="/profile" component={Profile} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/waiting" component={Waiting} />
          <Route path="/game" component={Game} />
          <Route path="/game-result" component={GameResult} />
          <Route component={Login} />
        </Switch>
      </UserInfoProvider>
    </SocketProvider>
  </Router>
);

export default App;
