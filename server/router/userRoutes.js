const express = require("express")
const userRouter = express.Router()

const {userReg, userLogin} = require('../control/userControl')
const upload = require('../multer/userMulter')

userRouter.route("/reg").post(upload.single("images"),userReg)
userRouter.route("/userLogin").post(userLogin)

module.exports=userRouter