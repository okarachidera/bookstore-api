import express, { NextFunction, Request, Response } from 'express';
import { registerUser,loginUser } from "../controller/user";
import { loginPolicy, signupPolicy } from '../middleware/middleware';

const router = express.Router();

/* GET users listing. */
router.post('/signup',signupPolicy,registerUser);
router.post('/login',loginPolicy, loginUser);



export default router;
