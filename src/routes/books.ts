import express, { NextFunction, Request, Response } from 'express';
import {
    getAllAuthor,
    postAuthor, 
    updateAuthor, 
    deleteAuthor, 
    getABook, 
    updateBook, 
    deleteBook, 
    getAuthor, 
    postBook
} from '../controller/books.controller';
import jwt from "jsonwebtoken";
import { User } from "../model/user";



const router = express.Router();

// router.route("/")
//         .get()
//         .post();


// router.route("/")

router.get('/',User.verifyToken, getAllAuthor) // gets all authors
router.get('/:id',User.verifyToken, getAuthor) // get author by id
router.get('/:authorId/book/:bookId',User.verifyToken, getABook) // get book by author id and book id
router.post('/',User.verifyToken, postAuthor) // post author
router.post('/:authorId/book',User.verifyToken, postBook) // post book by author id and book id
router.put('/:id',User.verifyToken,updateAuthor) // update author by author id
router.put('/:authorId/book/:bookId',User.verifyToken, updateBook) //update book by author id
router.delete('/:id',User.verifyToken, deleteAuthor) //delete author by author id
router.delete('/:authorId/book/:bookId',User.verifyToken, deleteBook) // delete book by author id and book id





export default router;