const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "paid", "overdue"],
    default: "pending",
  },
  repayments: [
    {
      amount: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Loan", LoanSchema);
