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
  // Saves a user data to the database
  saveUserData: function(id) {
    return axios.post("/api/users/" + id);
  },

  loginUser: function(user) {
    return axios.post("/api/login", user);
  },
  logOutUser: function(user) {
    return axios.get("/api/logout");
  },

  findUser: function(user) {
    return axios.get("/api/login");
  },
  //Saves default user bills and rommates below
  saveUser: function(user) {
    return axios.post("/api/users", user);
  },
  saveBills: function(bills) {
    return axios.post("/api/bills", bills);
  },
  saveRoommates: function(roommates) {
    return axios.post("/api/roommates", roommates);
  },
  findBills: function(bills) {
    return axios.get("/api/bills", bills);
  },
  findRoommates: function(roommates) {
    return axios.get("/api/roommates", roommates);
  }
};
