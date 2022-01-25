import express, { NextFunction, Request, Response } from "express";
import {
	getAllAuthor,
	postAuthor,
	updateAuthor,
	deleteAuthor,
	getAllBooksForAuthor,
	updateBook,
	deleteBook,
	getAuthor,
	postBook,
} from "../controller/books.controller";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import imageMulter from "../utils/multerImageUpload";
import {
	allAuthorPolicy,
	authorbooksPolicy,
	createauthorPolicy,
	createbooksPolicy,
	deleteauthorPolicy,
	deletebookPolicy,
	oneauthorPolicy,
	updateauthorPolicy,
	updatebookPolicy,
} from "../middleware/middleware";

const router = express.Router();

router.get("/:pageno", allAuthorPolicy, User.verifyToken, getAllAuthor); // gets all authors
router.get("/:authorId", oneauthorPolicy, User.verifyToken, getAuthor); // get author by id
router.get(
	"/books/:authorId/:pageno",
	authorbooksPolicy,
	User.verifyToken,
	getAllBooksForAuthor
); // get books for an by author id
router.post(
	"/",
	createauthorPolicy,
	User.verifyToken,
	// imageMulter.single("image"),
	postAuthor
); // post author
router.post(
	"/:authorId/book",
	createbooksPolicy,
	User.verifyToken,
	// imageMulter.single("image"),
	postBook
); // post book by author id and book id
router.put("/:id", updateauthorPolicy, User.verifyToken, updateAuthor); // update author by author id
router.put("/book/:bookId", updatebookPolicy, User.verifyToken, updateBook); //update book by author id
router.delete("/:id", deleteauthorPolicy, User.verifyToken, deleteAuthor); //delete author by author id
router.delete("/book/:bookId", deletebookPolicy, User.verifyToken, deleteBook); // delete book by author id and book id

export default router;
