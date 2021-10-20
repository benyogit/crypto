import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HistoricalRates  from './CurrentRates';
import CurrentRates  from './HistoricalRates';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Rates History</Link>
            </li>
            <li className = "margin-top-20">
              <Link to="/history">Current Rates</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/history">
            <HistoricalRates />
          </Route>
          <Route path="/">
            <CurrentRates/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
