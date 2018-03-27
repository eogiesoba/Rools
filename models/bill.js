const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
    electricity: { 
        type: Number, 
        required: true,
    },
    gas: { 
        type: Number, 
        required: true,
    },
    internet: { 
        type: Number, 
        required: true,
    },
    rent: { 
        type: Number, 
        required: true,
    },
    date: [String],
    userID: {type: Schema.Types.ObjectId}
});

const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;