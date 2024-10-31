const express = require("express");
const router = express.Router();

const  {todo,getTodo,delTodo}  = require("../control/todoControl");

router.route("/todo").post(todo);
router.route("/gettodo").get(getTodo);
router.route("/deletetodo/:id").delete(delTodo)

module.exports = router;
 