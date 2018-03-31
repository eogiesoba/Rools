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
  logOutUser: function(user) {
    return axios.get("/api/logout");
  },
  getUser: function(user) {
    return axios.get("/api/login");
  },
  //Saves default user bills and rommates
  saveBills: function(bills) {
    return axios.post("/api/bills", bills);
  },
  saveRoommates: function(roommates) {
    return axios.post("/api/roommates", roommates);
  }
};
