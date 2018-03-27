import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () =>
  <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/books" component={Books} />
        {/* <Route exact path="/books/:id" component={Detail} /> */}
        <Route component={NoMatch} />
      </Switch>
  </Router>;

export default App;
