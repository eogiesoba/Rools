import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Nav from "../../components/Nav";

class Books extends Component {
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
                <button className="e-Icon"></button>
                <h2>Electricity - Bill:</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron gCard">
                <button className="g-Icon"></button>
                <h2>Gas - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron iCard">
                <button className="i-Icon"></button>
                <h2>Internet - Bill:</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron rCard">
                <button className="r-Icon"></button>
                <h2>Rent - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Books;
