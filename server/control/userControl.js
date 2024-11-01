const userReg = (req, res) => {
  try {
    const { fullname, images, email, password } = req.body;
    console.log(req.body);
    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add user", details: error.message });
  }
};
 module.exports={userReg}