const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../database/models/adminModel');
const User = require('../database/models/userModel')

const protect = asyncHandler(async (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    const originalUrl = req.originalUrl.split('/')[2];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (originalUrl === 'admin') {
      req.admin = await Admin.findById(decoded.id).select('-password')
    } else {
      req.user = await User.findById(decoded.id).select('-password')
    }

    next()

  } else {
    res.json('Not authorized')
  }

})

module.exports = { protect }
