const express = require("express")
const userRouter = express.Router()

const {userReg} = require('../control/userControl')
const upload = require('../multer/userMulter')

userRouter.route("/reg").post(upload.single("images"),userReg)

module.exports=userRouter