const userModel = require("../model/userModel");
const upload = require("../multer/userMulter");
const bcrypt = require("bcrypt");
const {tokenCreation} = require('../middleware/token')
let salt = 10;

const userReg = async (req, res) => {
  try {
    const { fullname, images, email, password } = req.body;
    const result = await userModel.find({ email: email });
    if (result.length > 0) {
      res.status(200).json({ status: 200, msg: "Email alredy exists" });
    } else {
      bcrypt.hash(password, salt, function (err, hash) {
        userModel.create({
          fullname,
          images: req.file.filename,
          email,
          password: hash,
        });
      });
      res.status(201).json({ status: 201, msg: "User Registered" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, msg: "Failed to add user" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.find({ email: email });
  let password_db 
  if (user.length > 0) {
    password_db = user[0].password;
    const result = await bcrypt.compare(password, password_db);
    if (result) {
      const token = await tokenCreation(user)
      res.status(200).json({ status: 200, msg: "Login Success", userId:user[0]._id, token});
    } else {
      res.status(200).json({ status: 400, msg: "Incorrect Password" });
    }
  } else {
    res.json({ status: 400, msg: "Incorrect email" });
  }
};

const userView = async(req,res)=>{
  try{
    const {userid} = req.headers
    const view = await userModel.find({_id:userid})
    if(view.length>0){
      res.status(201).json(view)
    }
    else{
      res.status(200).json([])
    }
  }
  catch(err){
    res.status(500).json("Erro",err)
  }
}

module.exports = { userReg, userLogin, userView };
