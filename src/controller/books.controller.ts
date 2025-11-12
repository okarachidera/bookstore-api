import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {
	createAuthor,
	createBook,
	deleBookModel,
	deleteAuthorModel,
	getAllAuthorsModel,
	getAllBooksByAuthorModel,
	getOneAuthor,
	updateAuthorModel,
	updateBookModel,
} from "../model/db";

type RequestWithToken = Request & { token?: string };

const parsePageNumber = (value?: string | string[]) => {
	const asString = Array.isArray(value) ? value[0] : value;
	const parsed = parseInt(asString || "1", 10);
	return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export const getAllAuthor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				const pageNumber = parsePageNumber(
					req.params.pageno || (req.query.page as string | undefined)
				);
				const data = await getAllAuthorsModel(pageNumber);

				res.status(200).send({ message: "retrieved data", data });
			}
		}
	);
};

export const getAuthor = (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					const data = await getOneAuthor(req.params.authorId);
					res.status(200).json({ message: "success", data: data });
				} catch (error) {
					res.status(400).json({ error });
				}
			}
		}
	);
};

export const getAllBooksForAuthor = async (
	req: Request,
	res: Response,
	_next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	// jwt.verify()
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async function (err: any, data: any) {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					const { authorId } = req.params;
					const pageNumber = parsePageNumber(req.params.pageno);
					const data = await getAllBooksByAuthorModel(
						authorId,
						pageNumber
					);
					res.status(200).json({ response: "success", data });
				} catch (error) {
					res.status(400).json({ error });
				}
			}
		}
	);
};

export const postAuthor = async (req: Request, res: Response) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				res.sendStatus(403);
			} else {
				try {
					// let image= await cloudinaryImage.uploader.upload(req.file.path)
					
					let { author, age, address, image } = req.body;
					const parsedAge = Number(age);
					if (Number.isNaN(parsedAge)) {
						return res
							.status(400)
							.json({ message: "Age must be a valid number" });
					}
					let data = await createAuthor(
						author,
						parsedAge,
						address,
						image,
						image
					);
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

export const postBook = async (req: Request, res: Response) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				res.sendStatus(403);
			} else {
				// let image= await cloudinaryImage.uploader.upload(req.file.path)
				let image;
				let { name, isPublished, serialNumber,website } = req.body;
				let { authorId } = req.params;
				const normalizedIsPublished =
					typeof isPublished === "string"
						? isPublished === "true"
						: Boolean(isPublished);
				const parsedSerial = Number(serialNumber);
				if (Number.isNaN(parsedSerial)) {
					return res
						.status(400)
						.json({ message: "serialNumber must be a valid number" });
				}
				try {
					// let data = await createBook(authorId, name, isPublished, serialNumber,image.public_id,image.secure_url);
					let data = await createBook(
						authorId,
						name,
						normalizedIsPublished,
						parsedSerial,
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

export const updateAuthor = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let authorId = req.params.id;
					let { author, age, address, image } = req.body;
					const parsedAge = Number(age);

					let data = await updateAuthorModel(
						authorId,
						author,
						Number.isNaN(parsedAge) ? undefined : parsedAge,
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
		process.env.JWT_SECRET_KEY as string,
		async (err: any, data: any) => {
			if (err) {
				//console.log(req.token);
				res.sendStatus(403);
			} else {
				try {
					let { bookId } = req.params;
					let { authorId, name, isPublished, serialNumber, image, website } =
						req.body;
					const parsedSerial = Number(serialNumber);
					const normalizedIsPublished =
						typeof isPublished === "string"
							? isPublished === "true"
							: isPublished;
					let data = await updateBookModel(
						bookId,
						authorId,
						name,
						normalizedIsPublished,
						Number.isNaN(parsedSerial) ? undefined : parsedSerial,
						image,
						website
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
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
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestWithToken = req as RequestWithToken;
	if (!requestWithToken.token) {
		return res.sendStatus(403);
	}
	jwt.verify(
		requestWithToken.token as string,
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
