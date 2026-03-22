const express = require('express');
const { signup, register, verified, verify, login, signIn, signOut } = require('../controllers/user.controller.js');
const authRouter = express.Router();


authRouter.get('/signup', signup);

authRouter.post('/register', register);

authRouter.get('/verified', verified);

authRouter.post('/verify', verify);

authRouter.get('/login', login);

authRouter.post('/sign-in', signIn);

authRouter.post('/sign-out', signOut);



module.exports = authRouter;