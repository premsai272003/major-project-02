require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const users = await User.find({});
    console.log(`Total users: ${users.length}`);
    users.forEach(user => {
      console.log('User:', {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt
      });
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};

checkUser();
