import './App.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage.jsx';
import Home from './Components/Home/Home.jsx';
import Details from './Components/Details/Details.jsx';
import CreateActivity from './Components/CreateActivity/CreateActivity.jsx';

function App() {
    return (
      <Switch>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:id" element={<Details />} />
          <Route path="/createActivity" element={<CreateActivity />} />
      </Switch>
  );
}

export default App;
