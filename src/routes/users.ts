import express, { NextFunction, Request, Response } from 'express';
import { registerUser,loginUser } from "../controller/user";

const router = express.Router();

/* GET users listing. */
router.post('/signup',registerUser);
router.post('/login', loginUser);



export default router;
