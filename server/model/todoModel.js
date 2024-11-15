const mongoose = require("mongoose");
const userModel = require("../model/userModel")

const todoSchema = new mongoose.Schema(
  {
    userId:{type:mongoose.Schema.Types.ObjectId,ref:userModel},
    title: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todo_tbl", todoSchema);

module.exports = todoModel ;
