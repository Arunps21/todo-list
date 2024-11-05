const jwt = require("jsonwebtoken");

const tokenCreation=async(user)=>{
    const token = await jwt.sign({"user":user},'njskj656jhg',{ expiresIn: 60 * 60 })
    return token
}

module.exports={tokenCreation}