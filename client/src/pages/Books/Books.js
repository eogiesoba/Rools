import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Nav from "../../components/Nav";
import { Popover, Tooltip, Button, Modal, OverlayTrigger } from 'react-bootstrap';


class Books extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      electricity: false,
      gas: false,
      internet: false,
      rent: false
    };
  }

  handleClose () {
    this.setState({
      electricity: false,
      gas: false,
      internet: false,
      rent: false
    });
  }
  
  handleShow = event => {
    const {name} = event.target;
    this.setState({
        [name]: true
    });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

    return (
      <div className="mainBackground">
        <Nav />
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
                <button className="e-Icon" name="electricity" bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                </button>
                <h2>Electricity - Bill: $30</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron gCard">
                <button className="g-Icon" name="gas" bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                </button>
                <h2>Gas - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron iCard">
                <button className="i-Icon" name="internet" bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                </button>
                <h2>Internet - Bill:</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron rCard">
                <button className="r-Icon" name="rent" bsStyle="primary" bsSize="large" onClick={this.handleShow}></button>
                <h2>Rent - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
          <Modal show={this.state.gas} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Natural Gas Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

              <h4>Popover in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
              </p>

              <h4>Tooltips in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
              </p>
              <hr />
              <h4>Overflowing text to show scroll behavior</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.electricity} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Electricity Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

              <h4>Popover in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
              </p>

              <h4>Tooltips in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
              </p>
              <hr />
              <h4>Overflowing text to show scroll behavior</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.internet} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Internet Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

              <h4>Popover in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
              </p>

              <h4>Tooltips in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
              </p>
              <hr />
              <h4>Overflowing text to show scroll behavior</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.rent} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Rent Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Text in a modal</h4>
              <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

              <h4>Popover in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={popover}>
                  <a href="#popover">popover</a>
                </OverlayTrigger>{' '}
                here
              </p>

              <h4>Tooltips in a modal</h4>
              <p>
                there is a{' '}
                <OverlayTrigger overlay={tooltip}>
                  <a href="#tooltip">tooltip</a>
                </OverlayTrigger>{' '}
                here
              </p>
              <hr />
              <h4>Overflowing text to show scroll behavior</h4>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </Modal.Body>
            <Modal.Footer>
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
