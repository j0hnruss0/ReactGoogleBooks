import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from 'react-router'
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import OneBook from "./pages/OneBook";
import NoMatch from "./pages/NoMatch";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/saved" component={Saved} />
          <Route path="/saved/:id" render={props=> <OneBook {...props}/>} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;