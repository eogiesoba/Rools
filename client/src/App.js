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
      if(this.state.email !== "" && this.state.password !== ""){
        API.loginUser({
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
          if(res.data.email){
              status.isAuth = true;
              status.userData = res.data;
          }
          else{
              document.getElementById("eLogin").innerHTML = res.data.message;
          }
        })
        .catch(err => console.log(err))
        .then( res => {
          this.updateRender()
        });
      }
      else{
        document.getElementById("eLogin").innerHTML = "Please enter both username & password";
      }
  };

  updateRender = () => {
    if(status.isAuth){
      this.setState({ redirectToReferrer: true });
    }
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
                          <p className="login-error" id="eLogin"></p>
                          <form className="login" onSubmit={this.handleFormSubmit}>
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
                                  type="submit"
                                  name="login"
                                  className="btn-login">
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
