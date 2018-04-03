import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import {
  Button, Modal, OverlayTrigger,
  ControlLabel, FormGroup, InputGroup, FormControl
} from 'react-bootstrap';

const mNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let dateToday = new Date();
const dateMandY = mNames[dateToday.getMonth()] +" "+ dateToday.getFullYear();
const previousIndex = dateToday.getMonth() - 1;
var previousDate;

const status = {
  userData: {}
};

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      date: dateMandY,
      userData: "",
      userBills: "",
      userRoommates: "",
      eachRoommate: [],
      Auth: true,
      electricity: false,
      gas: false,
      internet: false,
      rent: false,
      plus: false,
      minus: false,
      Ep: [],
      Gp: [],
      Ip: [],
      Rp: [],
      eBill: 0,
      gBill: 0,
      iBill: 0,
      rBill: 0,
      paid: 0,
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
              email: status.userData.email
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
    console.log("Finding User Bills and Roommates!");
    API.findBills(this.state.date)
    .then(res => {
      console.log("Returned data for bad date REQ: ", res.data[0]);
      if(res.data[0]){
        console.log("Set state to bills from DB and get Roommate data :)")
        this.setState({ userBills: res.data[0] });
        console.log("UserBills: ", this.state.userBills)
        API.findRoommates(this.state.date)
        .then(res => {
          this.setState({
            userRoommates: res.data[0],
            eachRoommate: res.data[0].names,
            Ep: res.data[0].Ep,
            Gp: res.data[0].Gp,
            Ip: res.data[0].Ip,
            Rp: res.data[0].Rp
          });
          console.log("UserRoommates: ", this.state.userRoommates)
        })
      }
      else{
        console.log(" Run a Post new data to DB function and then recall findUser")
        API.saveBills({
          electricity: 0,
          gas: 0,
          internet: 0,
          rent: 0,
          date: dateMandY,
          email: this.state.userData.email
        })
        .then(res => {
          const previousIndex = dateToday.getMonth() - 1;
          if (previousIndex < 0 ){
            previousDate = mNames[11] +" "+ (dateToday.getFullYear()-1);
          }
          else{
            previousDate = mNames[previousIndex] +" "+ dateToday.getFullYear();
          }
          API.findRoommates(previousDate)
          .then(res => {
            const blankArr = res.data[0].Ep.map(elem => 0);
            API.saveRoommates({
              names: res.data[0].names,
              Ep: blankArr,
              Gp: blankArr,
              Ip: blankArr,
              Rp: blankArr,
              date: dateMandY,
              email: this.state.userData.email
            })
          })
         })
        .then(res => this.findUser())
        .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  }

  logOut = () => {
    console.log("Logging out now");
    API.logOutUser({})
      .then(res => { })
      .catch(err => console.log(err))
  }

  update_BnR = event => {
    const bType = event.target.value;
    console.log("Type of Bill: ", bType)

    const stateBillName = bType[0] + "Bill";
    const billAmount = Math.round(this.state[stateBillName]);
    console.log("Bill Amount $: ", billAmount)

    const roommate = document.getElementById(bType).value;
    console.log("Roommate Name: ", roommate)

    const paidAmount = Math.round(this.state.paid);
    console.log("Paid Amount $: ", paidAmount)

    const index = this.state.eachRoommate.indexOf(roommate);
    console.log("Roommate Index: ", index)

    const stateBAN = bType[0].toUpperCase() + "p";
    let billArray = [...this.state[stateBAN]];
    billArray[index] = paidAmount;
    console.log("Bill Array: " + stateBAN, billArray)

    const sumArr = arr => arr.reduce((a, b) => a + b, 0);
    const billSum = sumArr(billArray);
    console.log("Sum of Roommate money: ", billSum);

    if (billSum > billAmount) {
      console.log("Too much money!");
    }
    else {
      API.updateBills({
        [bType]: billAmount,
        date: this.state.date,
        email: this.state.userData.email
      })
        .then(res =>
          API.updateRoommates({
            [stateBAN]: billArray,
            date: this.state.date,
            email: this.state.userData.email
          })
        )
        .then(res => {
          this.handleClose();
          this.findUser();
        })
        .catch(err => console.log(err));
    }
  }

  addRoommate = () => {
    const roommateARR = [...this.state.userRoommates.names];
    roommateARR.push(this.state.roommate);
    var Ep = [...this.state.Ep]; Ep.push(0);
    var Gp = [...this.state.Gp]; Gp.push(0);
    var Ip = [...this.state.Ip]; Ip.push(0);
    var Rp = [...this.state.Rp]; Rp.push(0);

    if (this.state.roommate && roommateARR.length < 4) {
      console.log("Adding roommates!")
      var roomObj = {
        names: roommateARR,
        Ep: Ep,
        Gp: Gp,
        Ip: Ip,
        Rp: Rp,
        date: this.state.date,
        email: this.state.userData.email
      }
      console.log("RoomOBJ:", roomObj)
      API.updateRoommates(roomObj)
        .then(res => {
          this.handleClose();
          this.findUser();
        })
        .catch(err => console.log(err));
    }
  }

  deleteRoommate = () => {
    const roommate = document.getElementById("delete").value;
    const index = this.state.eachRoommate.indexOf(roommate);
    console.log("Roomate to Delete: ", roommate, "index: ", index);
    var Ep = [...this.state.Ep]; Ep.splice(index, 1);
    var Gp = [...this.state.Gp]; Gp.splice(index, 1);
    var Ip = [...this.state.Ip]; Ip.splice(index, 1);
    var Rp = [...this.state.Rp]; Rp.splice(index, 1);
    var names = [...this.state.eachRoommate]; names.splice(index, 1);

    var roomObj = {
      names: names,
      Ep: Ep,
      Gp: Gp,
      Ip: Ip,
      Rp: Rp,
      date: this.state.date,
      email: this.state.userData.email
    }
    console.log("RoomOBJ with deleted rommate:", roomObj)
    API.updateRoommates(roomObj)
      .then(res => {
        this.handleClose();
        this.findUser();
      })
      .catch(err => console.log(err));
  }

  dateFuture = () => {
    var mIndex = dateToday.getMonth() + 1;
    var testDate; 
    if (mIndex > 11){
      var testDate = "January " + (dateToday.getFullYear() + 1);
    }
    else{
      var testDate = mNames[mIndex] +" "+ dateToday.getFullYear();
    }
    API.findBills(testDate)
    .then(res => {
      console.log("Returned data for bad date REQ: ", res.data[0]);
      if(res.data[0]){
        if (mIndex > 11){
          dateToday = new Date((dateToday.getFullYear() + 1) , 0);
          this.state.date = "January " + (dateToday.getFullYear() + 1);
        }
        else{
          dateToday = new Date(dateToday.getFullYear() , mIndex);
          this.state.date = mNames[mIndex] +" "+ dateToday.getFullYear();
        }
        this.setState({ userBills: res.data[0] });
        console.log("UserBills: ", this.state.userBills)
        API.findRoommates(this.state.date)
        .then(res => {
          this.setState({
            userRoommates: res.data[0],
            eachRoommate: res.data[0].names,
            Ep: res.data[0].Ep,
            Gp: res.data[0].Gp,
            Ip: res.data[0].Ip,
            Rp: res.data[0].Rp
          });
          console.log("UserRoommates: ", this.state.userRoommates)
        })
      }
      else{
        console.log("Date does not exist yet in the Database!")
      }
    })
    .catch(err => console.log(err));
  }

  datePast = () => {
    var mIndex = dateToday.getMonth() - 1;
    var testDate; 
    if(mIndex < 0){
      testDate = "December " + (dateToday.getFullYear() - 1);
    }
    else{
      testDate = mNames[mIndex] +" "+ dateToday.getFullYear();
    }
    API.findBills(testDate)
    .then(res => {
      console.log("Returned data for bad date REQ: ", res.data[0]);
      if(res.data[0]){
        if (mIndex > 11){
          dateToday = new Date((dateToday.getFullYear() - 1) , 11);
          this.state.date = "December " + (dateToday.getFullYear() - 1);
        }
        else{
          dateToday = new Date(dateToday.getFullYear() , mIndex);
          this.state.date = mNames[mIndex] +" "+ dateToday.getFullYear();
        }
        this.setState({ userBills: res.data[0] });
        console.log("UserBills: ", this.state.userBills)
        API.findRoommates(this.state.date)
        .then(res => {
          this.setState({
            userRoommates: res.data[0],
            eachRoommate: res.data[0].names,
            Ep: res.data[0].Ep,
            Gp: res.data[0].Gp,
            Ip: res.data[0].Ip,
            Rp: res.data[0].Rp
          });
          console.log("UserRoommates: ", this.state.userRoommates)
        })
      }
      else{
        console.log("Date does not exist yet in the Database!")
      }
    })
    .catch(err => console.log(err));
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
                <button className="dateButton" id="past" onClick={this.datePast}>
                  <span className="glyphicon glyphicon-menu-left"></span>
                </button>
                <span className="date">{this.state.date}</span>
                <button className="dateButton" id="future" onClick={this.dateFuture}>
                  <span className="glyphicon glyphicon-menu-right"></span>
                </button>
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
                  {this.state.eachRoommate.map(elem =>
                      <div className="clear">
                        <span className="u-Icon"></span>
                        <h3>{elem} paid you $
                          <span>{this.state.Ep[this.state.eachRoommate.indexOf(elem)]} </span>
                          (<span>
                            {Math.round(this.state.Ep[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.electricity * 100)
                              ? Math.round(this.state.Ep[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.electricity * 100)
                              : 0}
                          </span>%)
                        </h3>
                      </div>
                    )}
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
                    {this.state.eachRoommate.map(elem =>
                      <div className="clear">
                        <span className="u-Icon"></span>
                        <h3>{elem} paid you $
                          <span>{this.state.Gp[this.state.eachRoommate.indexOf(elem)]} </span>
                          (<span>
                            {Math.round(this.state.Gp[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.gas * 100)
                              ? Math.round(this.state.Gp[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.gas * 100)
                              : 0}
                          </span>%)
                        </h3>
                      </div>
                    )}
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
                  {this.state.eachRoommate.map(elem =>
                      <div className="clear">
                        <span className="u-Icon"></span>
                        <h3>{elem} paid you $
                          <span>{this.state.Ip[this.state.eachRoommate.indexOf(elem)]} </span>
                          (<span>
                            {Math.round(this.state.Ip[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.internet * 100)
                              ? Math.round(this.state.Ip[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.internet * 100)
                              : 0}
                          </span>%)
                        </h3>
                      </div>
                    )}
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
                  {this.state.eachRoommate.map(elem =>
                      <div className="clear">
                        <span className="u-Icon"></span>
                        <h3>{elem} paid you $
                          <span>{this.state.Rp[this.state.eachRoommate.indexOf(elem)]} </span>
                          (<span>
                            {Math.round(this.state.Rp[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.rent * 100)
                              ? Math.round(this.state.Rp[this.state.eachRoommate.indexOf(elem)]
                              / this.state.userBills.rent * 100)
                              : 0}
                          </span>%)
                        </h3>
                      </div>
                    )}
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
                <FormControl componentClass="select" placeholder="select" id="gas">
                  {this.state.eachRoommate.map(elem =>
                    <option value={elem}>{elem}</option>
                  )}
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
              <Button onClick={this.update_BnR} value="gas">Update</Button>
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
                <FormControl componentClass="select" placeholder="select" id="electricity">
                  {this.state.eachRoommate.map(elem =>
                    <option value={elem}>{elem}</option>
                  )}
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
              <Button onClick={this.update_BnR} value="electricity">Update</Button>
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
                <FormControl componentClass="select" placeholder="select" id="internet">
                  {this.state.eachRoommate.map(elem =>
                    <option value={elem}>{elem}</option>
                  )}
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
              <Button onClick={this.update_BnR} value="internet">Update</Button>
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
                <FormControl componentClass="select" placeholder="select" id="rent">
                  {this.state.eachRoommate.map(elem =>
                    <option value={elem}>{elem}</option>
                  )}
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
            <Button onClick={this.update_BnR} value="rent">Update</Button>
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
              <FormGroup>
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select" id="delete">
                  {this.state.eachRoommate.map(elem =>
                    <option value={elem}>{elem}</option>
                  )}
                </FormControl>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.deleteRoommate}>Delete</Button>
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

export default Main;
