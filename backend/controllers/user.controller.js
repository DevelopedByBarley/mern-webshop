const User = require('../database/models/userModel')
const Order = require('../database/models/orderModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { password, email, userName } = req.body


  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(password, salt);
  console.log(hashedPw)
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

    if (user && (await bcrypt.compare(password, user.password))) {
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
  const { email } = req.user;
  console.log(email)
  if (email) {
    const orderOfUser = await Order.find({ "user.email": email  })
    res.json({ message: "Orders of user found !", orderOfUser: orderOfUser })
  } else {
    res.json({ message: "Orders of user finding error !", orderOfUser: false })
  }
}

const getOrder = async (req, res) => {
  const id = req.params.orderId;
  const { userName } = req.user

  if (userName) {
    try {
      const order = await Order.findById(id);
      res.json({ order: order })
      console.log("User founded!")
    } catch (error) {
      console.log(error)
      res.json({ order: false })
    }
  }
}

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { userName } = req.user

  if (userName) {
    try {
      await Order.findByIdAndDelete(orderId);
      res.json({ message: "Order succesfully deleted!" })
    } catch (error) {
      console.log(error)
    }
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
  getOrder,
  deleteOrder
}
