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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 v-center">
                        <div className="innerBox">
                            <h1 className="form-title">ROOLS</h1>
                            <form className="login">
                                <input type="text" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <Link to={"/books"}>
                                    <button type="button" value="Sign In" className="btn btn-login">Log In</button>
                                </Link>
                                <Link to={"/signup"}>
                                    <button type="button" value="Sign Up" className="btn btn-signUp">Sign Up</button>
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
