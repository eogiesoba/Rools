import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

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
        if (this.state.title && this.state.author) {
            API.saveBook({
                title: this.state.title,
                author: this.state.author,
                synopsis: this.state.synopsis
            })
                .then(res => this.loadBooks())
                .catch(err => console.log(err));
        }
    };

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
                                <Link to={"/books"}>
                                    <button type="button" value="Sign In" className="btn-login">Log In</button>
                                </Link>
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



