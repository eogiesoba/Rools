import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";

class SignUp extends Component {
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
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 v-center tall2">
                        <div class="innerBox">
                            <h1 class="form-title">ROOLS</h1>
                            <form class="login">
                                <input type="text" placeholder="Email" />
                                <input type="text" placeholder="Username" />
                                <input type="password" placeholder="Password" />
                                <Link to={"/"}>
                                    <button type="button" value="Register" class="btn btn-register">Register</button>
                                </Link>
                                <Link to={"/"}>
                                    <button type="button" value="Cancel" class="btn btn-cancel">Cancel</button>
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
