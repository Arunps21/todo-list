const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo_tbl", todoSchema);

module.exports = todoModel ;
