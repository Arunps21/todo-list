const express = require("express");
const router = express.Router();

const  {todo,getTodo}  = require("../control/todoControl");

router.route("/todo").post(todo);
router.route("/gettodo").get(getTodo);

module.exports = router;
