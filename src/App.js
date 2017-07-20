import React from "react";
import GameConfig from "./containers/GameConfig";
import Play from "./containers/Play";
import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
const App = () =>
  <Router>
    <div>
      <Route exact path="/" component={GameConfig} />
      <Route exact path="/play" component={Play} />
    </div>
  </Router>;
export default App;
