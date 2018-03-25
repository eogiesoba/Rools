import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class SignIn extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        synopsis: ""
    };

    componentDidMount() {
        this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
            .then(res =>
                this.setState({ books: res.data, title: "", author: "", synopsis: "" })
            )
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2 text">
                        <h1><strong>SignIn</strong> Login Form</h1>
                        <div className="description">
                            <p>
                                This is a free responsive login form made with Bootstrap.
	                            	Download it on <a href="http://azmind.com"><strong>AZMIND</strong></a>, customize and use it as you like!
                            	</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3 form-box">
                        <div className="form-top">
                            <div className="form-top-left">
                                <h3>Login to our site</h3>
                                <p>Enter your username and password to log on:</p>
                            </div>
                            <div className="form-top-right">
                                <i className="fa fa-lock"></i>
                            </div>
                        </div>
                        <div className="form-bottom">
                            <form role="form" action="" method="post" className="login-form">
                                <div className="form-group">
                                    <label className="sr-only" for="form-username">Username</label>
                                    <input type="text" name="form-username" placeholder="Username..." className="form-username form-control" id="form-username" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="form-password">Password</label>
                                    <input type="password" name="form-password" placeholder="Password..." className="form-password form-control" id="form-password" />
                                </div>
                                <button type="submit" className="btn">Login</button>
                                <Link to={"/signup"}>
                                    <button type="submit" className="btn">Sign Up</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3 social-login">
                        <h3>...or login with:</h3>
                        <div className="social-login-buttons">
                            <a className="btn btn-link-2" href="#">
                                <i className="fa fa-facebook"></i> Facebook
	                        	</a>
                            <a className="btn btn-link-2" href="#">
                                <i className="fa fa-twitter"></i> Twitter
	                        	</a>
                            <a className="btn btn-link-2" href="#">
                                <i className="fa fa-google-plus"></i> Google Plus
	                        	</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;
