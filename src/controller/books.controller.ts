import express, { Request, Response, NextFunction } from "express";
import { readFile, writeFile, author, errInt } from "../utils/utils";
import { generateIdsForBooks, validateEntry } from "../utils/utils";
import jwt, { VerifyOptions } from "jsonwebtoken";
import {
	createAuthor,
	createBook,
	deleBookModel,
	deleteAuthorModel,
	getAllAuthorsModel,
	getAllBooksByAuthorModel,
	getOneAuthor,
	getOneBook,
	updateAuthorModel,
	updateBookModel,
} from "../model/db";
import cloudinaryImage from "../utils/cloudinary";

export const getAllAuthor = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				let { pageno } = req.params;
				const data = await getAllAuthorsModel(pageno);

				res.status(200).send({ message: "retrieved data", data });
			}
		}
	);
};

export const getAuthor = (req: any, res: Response, _next: NextFunction) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					const data = await getOneAuthor(req.params.id);
					res.status(200).json({ message: "success", data: data });
				} catch (error) {
					res.status(400).json({ error });
				}
			}
		}
	);
};

export const getAllBooksForAuthor = async (
	req: any,
	res: Response,
	_next: NextFunction
) => {
	// jwt.verify()
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			console.log(req.token, data);
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					const data = await getAllBooksByAuthorModel(
						req.params.authorId,
						req.params.pageno
					);
					res.status(200).json({ response: "success", data });
				} catch (error) {
					res.status(400).json({ error });
				}
			}
		}
	);
};

export const postAuthor = async (req: any, res: Response) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					// let image= await cloudinaryImage.uploader.upload(req.file.path)
					
					let { author, age, address ,image} = req.body;
					// let data = await createAuthor(author, age, address,image,image.public_id);
					let data = await createAuthor(author, age, address, image, image);
					data
						? res.status(201).json({ message: "creates new author", data })
						: res
								.status(400)
								.json({ message: "error occurred in creating author" });
				} catch (error) {
					res.status(500).json({message:'author already exists',error});
				}
			}
		}
	);
};

export const postBook = async (req: any, res: Response) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				console.log(req.token);
				res.sendStatus(403);
			} else {
				// let image= await cloudinaryImage.uploader.upload(req.file.path)
				let image;
				let { name, isPublished, serialNumber,website } = req.body;
				let { authorId } = req.params;
				try {
					// let data = await createBook(authorId, name, isPublished, serialNumber,image.public_id,image.secure_url);
					let data = await createBook(
						authorId,
						name,
						isPublished,
						serialNumber,
            website,
						image,
						image
					);
					data
						? res.status(201).json({ message: "new book added", data })
						: res
								.status(400)
								.json({ message: "error occurred in creating book", data });
				} catch (error) {
					return res
						.status(500)
						.json({ message: "Book already exist", error });
				}
			}
		}
	);
};

export const updateAuthor = (req: any, res: Response, next: NextFunction) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let authorId = req.params.id;
					let { author, age, address, image } = req.body;

					let data = await updateAuthorModel(
						authorId,
						author,
						age,
						address,
						image
					);
					data
						? res.status(201).json({ message: "updates an author", data })
						: res.status(400).json({ message: "no author found", data });
				} catch (error) {
					res.status(400).send(error);
				}
			}
		}
	);
};

export const updateBook = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let { bookId } = req.params;
					let { authorId, name, isPublished, serialNumber, image } = req.body;
					let data = await updateBookModel(
						bookId,
						authorId,
						name,
						serialNumber,
						isPublished,
						image
					);
					data
						? res.status(201).json({ message: "updates a book", data })
						: res.status(400).json({ message: "no book found", data });
				} catch (error) {
					res.status(400).send(error);
				}
			}
		}
	);
};

export const deleteAuthor = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let { id } = req.params;
					let data = await deleteAuthorModel(id);
					data
						? res.status(201).json({ message: "Trashed!", data })
						: res.status(400).json({ message: "error occurred on delete" });
				} catch (error) {
					res.status(400).send(error);
				}
			}
		}
	);
};

export const deleteBook = async (
	req: any,
	res: Response,
	next: NextFunction
) => {
	jwt.verify(
		req.token,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let { bookId } = req.params;
					let data = await deleBookModel(bookId);
					res.status(200).json({
						message: `Book with the id ${req.params.bookId} has been trashed`,
						data,
					});
				} catch (error) {
					res.status(400).send(error);
				}
			}
		}
	);
};
