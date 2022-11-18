const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../database/models/adminModel');

const protect = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(400).json('Not authorized token')
    }
  } else {
    res.status(400).json('Not authorized')
  }

})

module.exports = { protect }
