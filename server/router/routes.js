const express = require("express");
const router = express.Router();

const  {todo, getTodo, delTodo, editTodo, updateTodo}  = require("../control/todoControl");

router.route("/todo").post(todo);
router.route("/gettodo").get(getTodo);
router.route("/deletetodo/:id").delete(delTodo)
router.route("/edittodo").get(editTodo)
router.route("/updatetodo").post(updateTodo)

module.exports = router;
 