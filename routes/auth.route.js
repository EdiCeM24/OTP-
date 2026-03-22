import express from 'express';
import { signup, register, verified, verify, login, signIn, home, signOut, userInfo } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const authRouter = express.Router();


authRouter.get('/signup', signup);

authRouter.post('/register', register);

authRouter.get('/verified', verified);

authRouter.post('/verify', verify);

authRouter.get('/userInfo', verifyToken, userInfo)

authRouter.get('/login', login);

authRouter.post('/sign-in', verifyToken, signIn);

authRouter.get('/home', home);

authRouter.post('/sign-out', signOut);



export default authRouter;