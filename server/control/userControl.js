const userModel = require("../model/userModel")
const upload = require("../multer/userMulter")
const bcrypt = require("bcrypt")
let salt = 10

const userReg = async(req, res) => {
  try {
    const { fullname, images, email, password } = req.body;
    const result = await userModel.find({email : email})
    if(result.length>0){
      res.status(200).json("Email alredy exists")
    }
    else{
      bcrypt.hash(password,salt,function(err,hash){
        userModel.create({
          fullname,
          images:req.file.originalname,
          email,
          password:hash
        })
      })
      res.status(201).json("User Registered" );
    }
  } catch (error) {
    res
      .status(500)
      .json("Failed to add user");
  }
};
 module.exports={userReg}