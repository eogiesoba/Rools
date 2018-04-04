import axios from "axios";

export default {
  //Login and Logout the user's session
  loginUser: function(user) {
    return axios.post("/api/login", user);
  },
  logOutUser: function(user) {
    return axios.get("/api/logout");
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
  //Finds / Retrieves user's personal info, bills and rommates below
  findUser: function() {
    return axios.get("/api/login");
  },
  findBills: function(bills) {
    return axios.get("/api/bills/" + bills);
  },
  findRoommates: function(roommates) {
    return axios.get("/api/roommates/" + roommates);
  },
  //Upate the user's roommates and bills
  updateBills: function(bills) {
    return axios.put("/api/bills", bills);
  },
  updateRoommates: function(roommates) {
    return axios.put("/api/roommates", roommates);
  }
};
