import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import { Popover, Tooltip, Button, Modal, OverlayTrigger, 
ControlLabel, FormGroup, InputGroup, FormControl } from 'react-bootstrap';


class Books extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
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
    }
  };
  handleInputChange = event => {
    const { name, value } = event.target;
      this.setState({
        [name]: value
      });
  };

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div className="mainBackground">
        <Nav plusName="plus" plusClick={this.handleShow} />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <div className="dateBlock">
                <button className="dateButton"><span className="glyphicon glyphicon-menu-left"></span></button>
                <span className="date">February 2019</span>
                <button className="dateButton"><span className="glyphicon glyphicon-menu-right"></span></button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron eCard">
                <button className="e-Icon" name="electricity" onClick={this.handleShow}>
                </button>
                <h2>Electricity - Bill: $30</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron gCard">
                <button className="g-Icon" name="gas" onClick={this.handleShow}>
                </button>
                <h2>Gas - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron iCard">
                <button className="i-Icon" name="internet" onClick={this.handleShow}>
                </button>
                <h2>Internet - Bill:</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron rCard">
                <button className="r-Icon" name="rent" onClick={this.handleShow}></button>
                <h2>Rent - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>

          <Modal show={this.state.gas} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Gas Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter bill amount below</h4>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>$</InputGroup.Addon>
                  <FormControl
                    value={this.state.gBill}
                    onChange={this.handleBillChange}
                    name="gBill"
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.plus} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Rent Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Please enter new roommate below</h4>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    name={this.state.roommate}
                    placeholder="Enter Roommate"
                    onChange={this.handleInputChange}
                  />
                </InputGroup>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Update</Button>
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
              <Button onClick={this.handleClose}>Update</Button>
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
