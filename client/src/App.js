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
      })
      .catch(err => console.log(err))
      .then( res => {
      this.updateRender()
      });
  };
  updateRender = () => {
    if(status.isAuth){
      this.setState({ redirectToReferrer: true });
    }
    // else{
    //     document.getElementById("warning_mssg").innerHTML = "Error: User does not exist, please type in existing user";
    // }
  }
  render() {

    const { redirectToReferrer } = this.state;
    
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
                              {/* <p id="warning_mssg"></p> */}
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
