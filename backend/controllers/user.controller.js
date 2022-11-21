const User = require('../database/models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { password, email, userName } = req.body


  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);
  const isUserExist = await User.findOne({
    email: email,
    userName: userName
  })

  if (!isUserExist) {
    try {
      const user = await User.create({
        email: req.body.email,
        userName: userName,
        password: hashedPw,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        settlement: req.body.settlement,
        postCode: req.body.postCode,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
        phoneNumber: req.body.phoneNumber,
      })

      res.status(200).json({ user: user, message: "User succesfully created!" })
    } catch (error) {
      res.status(400).json({ user: false, message: "Error creating user!" })
    }
  } else {
    res.status(400).json({ user: false, message: "Sorry, the user is exist!" })
  }


}

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: email
  })

  if (user && (bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id)
    })
  }

}


const getMe = (req, res) => {
  const { user } = req

  if (user) {
    res.status(200).json({ user: user, message: "Found User!" })
  } else {
    res.status(400).json({ user: false, message: "Error finding user!" })
  }
}


function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  register,
  login,
  getMe
}
