import express, { NextFunction, Response, Request } from 'express';
const router = express.Router();
import { User } from "../model/user";

import {getAllAuthor} from '../controller/books.controller';



router.get('/',(req: Request, res: Response)=>{
    res.render('home')
}) // gets all authors




export default router;
