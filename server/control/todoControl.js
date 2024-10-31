const todoModel = require("../model/todoModel");

const todo = async (req, res) => {
  try {
    const { title, description, date, time } = req.body;

    const newTodo = await todoModel.create({
      title,
      description,
      date,
      time,
    });
    console.log(req.body);
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

module.exports = { todo, getTodo, delTodo };
