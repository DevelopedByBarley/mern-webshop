const User = require('../database/models/userModel')
const Order = require('../database/models/orderModel')
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
      console.log(error);
      res.status(400).json({ user: false, message: "Error creating user!" })
    }
  } else {
    res.status(400).json({ user: false, message: "Sorry, the user is exist!" })
  }


}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email: email
    })

    if (user && (bcrypt.compare(password, user.password))) {
      res.status(200).json({
        id: user._id,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.json({ user: false, message: "Invalid email or password!" })
    }
  } catch (error) {
    console.log(error);
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


const getOrders = async (req, res) => {
  const { userName } = req.user
  if (userName) {
    const orderOfUser = await Order.find({ userName: userName })
    console.log(orderOfUser);
    res.json({ message: "Orders of user found !", orderOfUser: orderOfUser })
  } else {
    res.json({ message: "Orders of user finding error !", orderOfUser: false })
  }
}

const getOrder = async (req, res) => {
  const id = req.params.orderId;

  try {
    const order = await Order.findById(id);
    res.json({order: order})
  } catch (error) {
    console.log(error)
    res.json({order: false})
  }
}




function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

module.exports = {
  register,
  login,
  getMe,
  getOrders,
  getOrder
}
