import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main";

import NoMatch from "./pages/NoMatch";
import SignUp from "./pages/SignUp";
import API from "./utils/API";
import { Link, Redirect } from "react-router-dom";


const App = () =>
  <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route path='/main' component={Main} />
        <Route component={NoMatch} />
      </Switch>
  </Router>;

const status = {
  isAuth: false,
  userData: {},
  authenticate() {
    this.isAuth = true;
  },
  signout() {
    this.isAuth = false;
  }
};

const PrivateRoute2 = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => status.isAuth ? <Component {...props} /> : ( <Redirect to='/' /> )} />
)
const PrivateRoute1 = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => status.isAuth ? <Redirect to='/main' /> : ( <Component {...props} /> )} />
)

class SignIn extends Component {
  state = {
      email: "",
      password: "",
      redirectToReferrer: false
  };

  handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
          [name]: value
      });
      console.log(this.state);
  };

  handleFormSubmit = event => {
      event.preventDefault();
      API.loginUser({
          email: this.state.email,
          password: this.state.password
      })
      .then(res => {
        status.isAuth = true;
        status.userData = res.data;
        console.log("Auth State Updated: ", status.isAuth);
      })
      .catch(err => console.log(err))
      .then( res => {
      this.updateRender()
      console.log("Redirecting now");
      console.log("Original Auth State: ", status.isAuth)}
    );
  };
  updateRender = () => {
    console.log("updatedRender has been called!")
    if(status.isAuth){
      this.setState({ redirectToReferrer: true });
    }
    console.log("referrer" , this.state.redirectToReferrer)
  }
  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    console.log("Inside Render Function Auth: ",status.isAuth )
    if (redirectToReferrer) {
      return <Redirect to={"/main"} />;
    }
      return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-12 v-center tall">
                      <div className="innerBox">
                          <h1 className="form-title">ROOLS</h1>
                          <h5 className="sub-title">Manage all your bills in 1 place</h5>
                          <form className="login">
                              <input
                                  type="text"
                                  value={this.state.email}
                                  onChange={this.handleInputChange}
                                  name="email"
                                  placeholder="Email"
                              />
                              <input
                                  type="password"
                                  value={this.state.password}
                                  onChange={this.handleInputChange}
                                  name="password"
                                  placeholder="Password"
                              />
                              <button
                                  type="button"
                                  name="login"
                                  className="btn-login"
                                  onClick={this.handleFormSubmit}>
                                  Log In
                              </button>
                              <Link to={"/signup"}>
                                  <button type="button" value="Sign Up" className="btn-signUp">Sign Up</button>
                              </Link>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}
export default App;
