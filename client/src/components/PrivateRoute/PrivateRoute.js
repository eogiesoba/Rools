import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => ( <Redirect to='/books' /> )} />
)

export default PrivateRoute;