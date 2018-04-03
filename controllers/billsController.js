const db = require("../models");

// Defining methods for the billsController
module.exports = {
  // find: function(req, res) {
  //   db.Bill
  //     .find({ email: req.body.email, date: req.body.date })//Needs to be changed to params
  //     .sort({ date: -1 })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  findById: function(req, res) {
    console.log("Req Params Id: ", req.params.id)
    db.Bill
      .find({ email: req.user.email, date: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Bill
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Bill
      .findOneAndUpdate({ email: req.body.email, date: req.body.date }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Bill
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
