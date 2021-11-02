import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Searchbar from './components/Searchbar';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route  path="/home">
        <Searchbar/>
        <Home/>
      </Route>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
