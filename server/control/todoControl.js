const todoModel = require("../model/todoModel");

const todo = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;
    const userId  = req.headers.userid
    console.log(req.headers)
    if (!userId) {
      console.log("No userId found in headers");
      return res.status(400).json({ error: "User ID is required" });
    } else {
      console.log("User ID received:", userId);
    }

    const newTodo = await todoModel.create({
      userId,
      title,
      description,
      date,
      time,
    });
    console.log(req.body);
    console.log(userId);
    res.status(201).json({ message: "Todo Added", todo: newTodo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add todo", details: error.message });
  }
};

//get data
const getTodo = async (req, res) => {
  const todoList = await todoModel.find();
  todoList.length > 0 ? res.json(todoList) : res.json([]);
};

//delete data
const delTodo = async (req, res) => {
  console.log("Delete request received for ID:", req.params.id);
  const idno = req.params.id;
  await todoModel.deleteOne({ _id: idno });
  res.json("Data deleted successfully");
};

//edit
const editTodo = async (req, res) => {
  const id = req.headers.id;
  const list = await todoModel.find({ _id: id });
  res.json(list);
};

//update
const updateTodo = async (req, res) => {
  const id = req.headers.id;
  const { title, description, date, time } = req.body;
  await todoModel.updateOne({ _id: id }, { title, description, date, time });
  res.json("Data Updated succesfully");
};

module.exports = { todo, getTodo, delTodo, editTodo, updateTodo };
