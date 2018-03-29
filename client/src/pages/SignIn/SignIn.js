import React, { Component } from "react";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";

class SignIn extends Component {
    state = {
        username: "",
        password: ""
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
            username: this.state.username,
            password: this.state.password
        })
        .then(res => this.redirectPage())
        .catch(err => console.log(err));
        console.log("Redirecting now");
    };

    redirectPage = () => {
        console.log("hello!")
        this.props.history.push('/books')
    }

    render() {
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
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                    name="username"
                                    placeholder="Username"
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

export default SignIn;



