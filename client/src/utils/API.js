import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a user to the database
  saveUser: function(user) {
    return axios.post("/api/users", user);
  },
  loginUser: function(user) {
    return axios.post("/api/login", user);
  },
  getUser: function(user) {
    return axios.get("/api/login");
  }
};
