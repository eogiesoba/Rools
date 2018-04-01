import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import {Button, Modal, OverlayTrigger,
  ControlLabel, FormGroup, InputGroup, FormControl
} from 'react-bootstrap';

const currentDate = "March 2018"; //Current Date
const status = {
  userData: {}
};

class Books extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      date: "March 2018",
      userData: "",
      userBills: "",
      userRoommates: "",
      Auth: true,
      electricity: false,
      gas: false,
      internet: false,
      rent: false,
      plus: false,
      minus: false,

      eBill: "",
      gBill: "",
      iBill: "",
      rBill: "",
      paid: "",
      roommate: ""
    };
  }

  handleClose() {
    this.setState({
      electricity: false,
      gas: false,
      internet: false,
      rent: false,
      plus: false,
      minus: false
    });
  }

  handleShow = event => {
    const { name } = event.target;
    this.setState({
      [name]: true
    });
  }

  handleBillChange = event => {
    const { name, value } = event.target;
    if (isNaN(value)) {
      console.log("Not a number, please enter a number")
    }
    else {
      this.setState({
        [name]: value
      });
      console.log(name, "Money: ", this.state[name]);
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(name, ": ", this.state[name]);
  };

  componentDidMount() {
    this.findUser();
  }

  findUser = () => {
    API.findUser({})
      .then(res => {
        status.userData = res.data;
        if (status.userData.username) {
          console.log("email :", status.userData.email)
          this.setState({
            userData: { 
              username: status.userData.username,
              email:  status.userData.email
            },
            Auth: true
          });
          this.findUserData();
        }
        else {
          this.setState({
            userData: { username: status.userData.username },
            Auth: false
          });
        }
      })
      .catch(err => console.log(err))
  }

  findUserData = () => {
      console.log("Finding User Bills and Roommates!")
      API.findBills({
        email: this.state.email,
        date: ["March", "2018"]
      })
      .then(res => {
        this.setState({ userBills: res.data[0] });
        console.log("UserBills: ", this.state.userBills)
        API.findRoommates({
          email: this.state.email,
          date: ["March", "2018"]
        })
        .then(res => {
          this.setState({ userRoommates: res.data[0] });
          console.log("UserRoommates: ", this.state.userRoommates)
        })
      })
      .catch(err => console.log(err));
  }

  logOut = () => {
    console.log("Logging out now");
    API.logOutUser({})
      .then(res => {})
      .catch(err => console.log(err))
  }

  updateRoommate = event => {
    // const { name } = event.target;
    // this.setState({
    //   [name]: true
    // });
    // var newFolder = document.getElementById("addFolder").value;
    API.updateRoommates({
      names: [],
      Ep: [],
      Gp: [],
      Ip: [],
      Rp: [],
      date: this.state.date,
      email: this.state.userData.email
    })
  }

  addRoommate = () => {
    var roommateARR = this.state.userRoommates.names;
    roommateARR.push(this.state.roommate);
    if(this.state.roommate){
      console.log("Adding roommates!")
      var roomObj = {
        names: roommateARR,
        date: ["March", "2018"],
        email: this.state.userData.email
      }
      console.log("RoomOBJ:",roomObj)
      API.updateRoommates(roomObj)
      .then(res => { this.handleClose() })
      .catch(err => console.log(err));
    }
  }

  render() {

    if (this.state.Auth) {
      console.log("You are authorized!");
    }
    else {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="mainBackground">
        <Nav
          plusName="plus"
          plusClick={this.handleShow}
          minusName="minus"
          minusClick={this.handleShow}
          username={this.state.userData.username}
          logOut={this.logOut} />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <div className="dateBlock">
                <button className="dateButton"><span className="glyphicon glyphicon-menu-left"></span></button>
                <span className="date">{this.state.date}</span>
                <button className="dateButton"><span className="glyphicon glyphicon-menu-right"></span></button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron eCard">
                <Row>
                  <Col size="md-12">
                    <button className="e-Icon" name="electricity" onClick={this.handleShow}>
                    </button>
                    <h2>Electricity - Bill: $<span>{this.state.userBills.electricity}</span></h2>
                    <span className="m-Icon"></span>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-12">
                    <span className="u-Icon"></span>
                    <h3>Ryan owes you $<span>10 </span>(<span>33</span>%)</h3>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron gCard">
                <Row>
                  <Col size="md-12">
                    <button className="g-Icon" name="gas" onClick={this.handleShow}>
                    </button>
                    <h2>Gas - Bill: $<span>{this.state.userBills.gas}</span></h2>
                    <span className="m-Icon"></span>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-12">
                    <span className="u-Icon"></span>
                    <h3>Ryan paid you $<span>10 </span>(<span>33</span>%)</h3>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron iCard">
                <Row>
                  <Col size="md-12">
                    <button className="i-Icon" name="internet" onClick={this.handleShow}>
                    </button>
                    <h2>Internet - Bill: $<span>{this.state.userBills.internet}</span></h2>
                    <span className="m-Icon"></span>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-12">
                    <span className="u-Icon"></span>
                    <h3>Ryan paid you $<span>24 </span>(<span>50</span>%)</h3>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron rCard">
                <Row>
                  <Col size="md-12">
                    <button className="r-Icon" name="rent" onClick={this.handleShow}></button>
                    <h2>Rent - Bill: $<span>{this.state.userBills.rent}</span></h2>
                    <span className="m-Icon"></span>
                  </Col>
                </Row>
                <Row>
                  <Col size="md-12">
                    <span className="u-Icon"></span>
                    <h3>Ryan paid you $<span>10 </span>(<span>33</span>%)</h3>
                  </Col>
                </Row>
              </Jumbotron>
            </Col>
          </Row>

          <Modal show={this.state.gas} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Gas Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <h4>Please enter bill amount below:</h4>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.gBill}
                    onChange={this.handleBillChange}
                    name="gBill"
                  />
                </InputGroup>
              </FormGroup>
              <br />
              <FormGroup>
                <h4>Roommates' Contribution:</h4>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Ryan</option>
                  <option value="other">Samuel</option>
                </FormControl>
                <br />
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.paid}
                    onChange={this.handleBillChange}
                    name="paid"
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.electricity} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Electricity Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter bill amount below</h4>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.eBill}
                    onChange={this.handleBillChange}
                    name="eBill"
                  />
                </InputGroup>
              </FormGroup>
              <br />
              <FormGroup>
                <h4>Roommates' Contribution:</h4>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Ryan</option>
                  <option value="other">Samuel</option>
                </FormControl>
                <br />
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.paid}
                    onChange={this.handleBillChange}
                    name="paid"
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.internet} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Internet Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter bill amount below</h4>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.iBill}
                    onChange={this.handleBillChange}
                    name="iBill"
                  />
                </InputGroup>
              </FormGroup>
              <br />
              <FormGroup>
                <h4>Roommates' Contribution:</h4>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Ryan</option>
                  <option value="other">Samuel</option>
                </FormControl>
                <br />
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.paid}
                    onChange={this.handleBillChange}
                    name="paid"
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.rent} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Rent Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter bill amount below</h4>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.rBill}
                    onChange={this.handleBillChange}
                    name="rBill"
                  />
                </InputGroup>
              </FormGroup>
              <br />
              <FormGroup>
                <h4>Roommates' Contribution:</h4>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Ryan</option>
                  <option value="other">Samuel</option>
                </FormControl>
                <br />
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.paid}
                    onChange={this.handleBillChange}
                    name="paid"
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.plus} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Roommate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter new roommate below</h4>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.roommate}
                    name="roommate"
                    placeholder="Enter Roommate"
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.addRoommate}>Add</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.minus} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Roommate(s)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please select roommate to delete</h4>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">Ryan</option>
                  <option value="other">Samuel</option>
                </FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Delete</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <div className="footer">
          <p>Designed and Coded by Efosa Ogiesoba</p>
        </div>
      </div>
    );
  }
}

export default Books;
