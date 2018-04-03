import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Modal } from 'react-bootstrap';

const mNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const dateToday = new Date();
const dateMandY = mNames[dateToday.getMonth()] +" "+ dateToday.getFullYear();

class SignUp extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            date: dateMandY,
            email: "",
            username: "",
            password: "",
            thankYou: false
        };
    }

    handleClose() {
        this.setState({
            thankYou: false
        });
    }

    handleShow = event => {
        this.setState({
            thankYou: true
        });
    }

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
            })
            .then(res => 
                API.saveBills({
                    electricity: 0,
                    gas: 0,
                    internet: 0,
                    rent: 0,
                    date: this.state.date,
                    email: this.state.email
                })
            )
            .then(res => 
                API.saveRoommates({
                    names: [],
                    Ep: [],
                    Gp: [],
                    Ip: [],
                    Rp: [],
                    date: this.state.date,
                    email: this.state.email
                })
            )
            .then(res => this.handleShow())
            .catch(err => console.log(err));
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
                                    name="thankYou"
                                    className="btn-register"
                                    disabled={!(this.state.email && this.state.username && this.state.password)}
                                    onClick={this.handleFormSubmit}>
                                    Register
                                </button>

                                <Link to={"/"}>
                                    <button type="button" value="Cancel" className="btn-cancel">Cancel</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.thankYou} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank You for registering!</Modal.Title>
                    </Modal.Header>
                </Modal>
            </div>
        );
    }
}

export default SignUp;
