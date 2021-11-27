import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CreateRecipe from "./components/CreateRecipe/CreateRecipe"

import Detail from './components/Detail/Detail.jsx';
function App() {
  return (
    <div className="App">
      
      <Route  path="/home">
        <Home data-testid="button"/>
      </Route>
      <Route path="/post">
        <CreateRecipe></CreateRecipe>
        </Route>
        <Route path="/detail/:id,:flag" component={Detail}/>
      <Route exact path="/">
        <LandingPage/>
      </Route>
      
    </div>
  );
}

export default App;
