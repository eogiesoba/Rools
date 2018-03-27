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
      <div>
        <Nav />
        <Container fluid>
          <Row>
            <Col size="md-12">
              <div className="date">
                <span className="glyphicon glyphicon-menu-left"></span>
                <span>February 2019</span>
                <span className="glyphicon glyphicon-menu-right"></span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron eCard">
                <h2>Electricity - Bill:</h2>
              </Jumbotron>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron gCard">
                <h2>Natural Gas - Bill:</h2>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-6">
              <Jumbotron className="jumbotron iCard">
                <h2>Internet - Bill:</h2>
              </Jumbotron>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input
                  value={this.state.author}
                  onChange={this.handleInputChange}
                  name="author"
                  placeholder="Author (required)"
                />
                <TextArea
                  value={this.state.synopsis}
                  onChange={this.handleInputChange}
                  name="synopsis"
                  placeholder="Synopsis (Optional)"
                />
                <FormBtn
                  disabled={!(this.state.author && this.state.title)}
                  onClick={this.handleFormSubmit}
                >
                  Submit Book
              </FormBtn>
              </form>
            </Col>
            <Col size="md-6 sm-12">
              <Jumbotron className="jumbotron rCard">
                <h2>Rent - Bill:</h2>
              </Jumbotron>
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Books;
