import express from "express";
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
import { User } from "../model/user";
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

router.get("/page/:pageno", allAuthorPolicy, User.verifyToken, getAllAuthor); // gets all authors
router.get("/id/:authorId", oneauthorPolicy, User.verifyToken, getAuthor); // get author by id
router.get(
	"/:authorId/books/page/:pageno",
	authorbooksPolicy,
	User.verifyToken,
	getAllBooksForAuthor
); // get books for an by author id
router.post(
	"/",
	createauthorPolicy,
	User.verifyToken,
	postAuthor
); // post author
router.post(
	"/:authorId/book",
	createbooksPolicy,
	User.verifyToken,
	postBook
); // post book by author id and book id
router.put("/:id", updateauthorPolicy, User.verifyToken, updateAuthor); // update author by author id
router.put("/book/:bookId", updatebookPolicy, User.verifyToken, updateBook); //update book by author id
router.delete("/:id", deleteauthorPolicy, User.verifyToken, deleteAuthor); //delete author by author id
router.delete("/book/:bookId", deletebookPolicy, User.verifyToken, deleteBook); // delete book by author id and book id

export default router;
