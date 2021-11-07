import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Create from "./components/CreateRecipe"
import CreateRecipe from './components/CreateRecipe';
import Detail from './components/Detail';
function App() {
  return (
    <div className="App">
      <Switch>
      <Route  path="/home">
        <Home/>
      </Route>
      <Route path="/post">
        <CreateRecipe></CreateRecipe>
        </Route>
        <Route path="/detail/:id,:flag" component={Detail}/>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
