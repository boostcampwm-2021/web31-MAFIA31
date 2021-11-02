import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './pages/Error/NotFound';
import Game from './pages/Game';
import GameResult from './pages/GameResult';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Waiting from './pages/Waiting';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/rooms" component={Rooms} />
      <Route exact path="/waiting" component={Waiting} />
      <Route exact path="/game" component={Game} />
      <Route exact path="/game-result" component={GameResult} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
