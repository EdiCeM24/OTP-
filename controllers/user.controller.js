const User = require('../models/User.model.js');
const bcryptSalt = require('bcryptjs');
const { verifier } = require('../middleware/authVerify.middleware.js');
const jwt = require('jsonwebtoken');



const signup = (req, res) => {
  try {
    res.render('register', { title: 'This is OTP register Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


const register = async (req, res) => {
  try {
     const { name, email, username, password } = req.body;

    // Checking data of form
    if(!name || !email || !username || !password) {
      return res.status(400).json({ message: 'Please fill all fields.'});
    }

    // Checking if user already exists
    const existingUser = await User.findOne({ where: { email } })
        
    if (existingUser) {
      res.status(400).json({ message: 'User with the email address already exists.'});
    }

    const salt = await bcryptSalt.genSalt(10);

    const hashedPassword = await bcryptSalt.hash(password, salt);

    const newUser = await User.create({
      name, 
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User has been created successfully!', newUser});
    verifier
    .subject(`Verify your account: ${otp}`)
    .text(`Your verification code is ${otp}`)
    .sendTo(email, (err) => {
      if (err) return res.send('Failed to send OTP: ' + err.message);
      console.log('OTP sent to', email);
      res.redirect(`/verify?email=${encodeURIComponent(email)}`);
    });

  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


const verified = (req, res) => {
  try {
    res.render('verify', { email: 'This is OTP login Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
    }
};


const verify = (req, res) => {
  try {
    const {otp} = req.body;

    console.log('OTP: ', otp);
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


const login = (req, res) => {
  try {
    res.render('login', { title: 'This is OTP login Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


const signIn = (req, res) => {
  try {
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


const signOut = (req, res) => {
  try {
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


module.exports = { signup, register, verified, verify, login, signIn, signOut };