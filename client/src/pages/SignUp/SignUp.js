import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class SignUp extends Component {
    state = {
        email: "",
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
        if (this.state.username && this.state.email && this.state.password) {
            API.saveUser({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).catch(err => console.log(err));
        }
        console.log("You Are Registered!")
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 v-center tall2">
                        <div className="innerBox">
                            <h1 className="form-title">ROOLS</h1>
                            <form className="login">
                                <input
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                    name="email"
                                    placeholder="Email"
                                />
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
                                    value="Register" 
                                    className="btn btn-register"
                                    disabled={!(this.state.email && this.state.username && this.state.password)}
                                    onClick={this.handleFormSubmit}>
                                    Register
                                    </button>
                              
                                <Link to={"/"}>
                                    <button type="button" value="Cancel" className="btn btn-cancel">Cancel</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
