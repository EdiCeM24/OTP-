import User from '../models/User.model.js';
import bcryptSalt from 'bcryptjs';
import { verifier } from '../middleware/authVerify.middleware.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from '../config/env.js';



export const signup = (req, res) => {
  try {
    res.render('register', { title: 'This is OTP register Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


export const register = async (req, res) => {
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
     
    newUser.save();
    
    res.redirect('verified');

    verifier
    .subject(`Verify your account: ${otp}`)
    .text(`Your verification code is ${otp}`)
    .sendTo(email, (err) => {
      if (err) return res.send('Failed to send OTP: ' + err.message);
      console.log('OTP sent to', email);
      res.redirect(`/verify?email=${encodeURIComponent(email)}`);
    });
     

    return res.status(201).json({ message: 'User has been created successfully!'});
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


export const verified = (req, res) => {
  try {
    res.render('verify', { email: 'This is OTP login Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
    }
};


export const verify = (req, res) => {
  try {
    const {otp} = req.body;

    console.log('OTP: ', otp);

    return res.redirect('login');
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


export const login = (req, res) => {
  try {
    res.render('login', { title: 'This is OTP login Page.'})
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


export const signIn = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(req.body);
    // Checking data from form (user end).
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required!'});
    }
    console.log('Email: ', email);
    console.log('Password: ', password);
    // Checking if there is no user.
    if (!user) return res.status(400).json({ error: 'User email address or password is incorrect.'});

    const isPasswordMatch = await bcryptSalt.compare(password, user.password);

    if(!isPasswordMatch) {
      return res.status(400).json({ error: 'Invalid credentials!'});
    }

    const accessToken = jwt.sign({userId: user.id}, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(200).json({
      success: true,
      message: 'User has been successfully signed in.',
      data: {
        accessToken,
        user
      }
    });

    return res.redirect('home');

  } catch (error) {
      return res.status(400).json({ message: `Error in loading the page: ${error}` });
  }
};

export const userInfo = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found!'});
    }

    return user;  // res.json({ user });

  } catch (error) {
    return res.status(400).json({ message: `Error in fetching user info: ${error}`})
  }
};

export const home = async (req, res) => {
  res.render('home');
}

export const signOut = (req, res) => {
  try {
    
  } catch (error) {
      return res.status(400).json({ message: 'Error in loading the page: ', error});
  }
};


