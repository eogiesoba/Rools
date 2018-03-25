const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoommateSchema = new Schema({
    names: [String],
    Ep: [Number],
    Gp: [Number],
    Ip: [Number],
    Rp: [Number],
    date: { 
      type: String, 
      required: true 
    },
    userID: {type: Schema.Types.ObjectId}
});

const Roommate = mongoose.model("Roommate", RoommateSchema);
module.exports = Roommate;