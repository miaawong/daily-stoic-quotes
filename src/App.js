import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      {/* wrap the brwoser with a <switch> - make sure only one routes is displayed at once  */}
      <Switch>
        {/* add exact to make sure route is matching exactly */}
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        {/* if the route doesn't match any of the ones with exact... it will route to 404*/}
        <Route path="/" component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
