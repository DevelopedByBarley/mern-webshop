const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');;
const Admin = require('../database/models/adminModel')




const registerAdmin = async (req, res) => {
  const { email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    await Admin.create({
      email: email,
      password: hashedPassword
    })

    res.json({ status: "ok" })
  } catch (error) {
    res.json({ status: "register is failed" })
  }


}




// Admin Login

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body



  try {
    const user = await Admin.findOne({
      email: email,
    })

    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        id: user._id,
        email: email,
        token: generateToken(user._id)
      })

    } else {
      res.json({ status: "login is failed" })
      console.log(error);
    }
  } catch (error) {
    res.json({ status: "Can not fin user" })
    console.log(error);
  }
})



// Get Admin Data
const getMe = asyncHandler(async (req, res) => {
  const { admin } = req;

  if (admin) {
    res.json({ admin: admin, message: "Admin succesfully found!" })
  } else {
    res.json({ message: "Error finding Admin!" })
  }



})










function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  loginAdmin,
  registerAdmin,
  getMe
}