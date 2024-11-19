const express = require("express")
const userRouter = express.Router()

const {userReg, userLogin, userView} = require('../control/userControl')
const upload = require('../multer/userMulter')

userRouter.route("/reg").post(upload.single("images"),userReg)
userRouter.route("/userLogin").post(userLogin)
userRouter.route("/userView").get(userView)

module.exports=userRouter