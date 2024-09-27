const mongoose = require("mongoose");

const pay = new mongoose.Schema(
  {
    payment_id: {
      type: String
    },
    username: {
      type: String,
    },
    amount: {
      type: Number,
    },
    email: {
      type: String
    },
  },
  { timestamps: true }
);

const payment = mongoose.model('Payment', pay);

module.exports = payment;
