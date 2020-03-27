import React from "react";
import "./styles/App.scss";
import PokeLogo from "./images/poke-logo.png";
import PokeList from "./components/poke-list";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <img src={PokeLogo} className="App-logo" alt="logo" />
        <Switch>
          <Route path="/" component={PokeList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
