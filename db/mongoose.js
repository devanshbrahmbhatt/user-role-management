const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/user-role-management';
const connectDB = async () => {
    try {
      await mongoose.connect(mongoURL);
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    }
  };

  module.exports = connectDB;