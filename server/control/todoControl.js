const  todoModel  = require('../model/todoModel');

const todo = async (req, res) => {
    try {
        const { title, description, date, time } = req.body;
        
        const newTodo = await todoModel.create({
            title,
            description,
            date,
            time,
        });
        console.log(req.body)
        res.status(201).json({ message: "Todo Added", todo: newTodo });
    } catch (error) {
        res.status(500).json({ error: "Failed to add todo", details: error.message });
    }
};

//fetch data

const getTodo=async(req,res)=>{
    const todoList = await todoModel.find()
    todoList.length>0? res.json(todoList):res.json([])
}

module.exports = {todo,getTodo};
