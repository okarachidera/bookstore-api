import mongoose from "mongoose";

const avatar = {
	author:
		"https://res.cloudinary.com/ckgraphics/image/upload/v1641005399/undraw_profile_pic_ic5t_rkejzu.png",
	user: "https://res.cloudinary.com/ckgraphics/image/upload/v1641005399/undraw_profile_pic_ic5t_rkejzu.png",
	book: "https://res.cloudinary.com/ckgraphics/image/upload/v1643101908/bookstore/books_icon_q3fqh8.png",
};

const authorSchema = new mongoose.Schema(
	{
		id: { type: String, unique: true },
		author: { type: String, unique: true },
		age: Number,
		address: String,
		image: String,
		cloudinary_id: String,
	},
	{ timestamps: true }
);

const bookSchema = new mongoose.Schema(
	{
		id: { type: String, unique: true },
		authorid: {
			type: mongoose.Schema.Types.String,
			ref: "Author",
		},
		name: { type: String, unique: true },
		isPublished: Boolean,
		datePublished: { type: Date, default: Date.now },
		serialNumber: String,
		website: String,
		image: String,
		cloudinary_id: String,
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

const usersSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		dob: Date,
		email: { type: String, unique: true },
		phoneNumber: { type: String, unique: true },
		password: String,
		image: String,
	},
	{ timestamps: true }
);

// model
const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);
export const Users = mongoose.model("Users", usersSchema);

const getNumericSuffix = (value: string, prefix: string): number => {
	if (!value?.startsWith(prefix)) return 0;
	const parsed = parseInt(value.replace(prefix, ""), 10);
	return Number.isNaN(parsed) ? 0 : parsed;
};

const nextIdentifier = async (model: mongoose.Model<any>, prefix: string) => {
	const lastRecord = await model.findOne().sort({ createdAt: -1 }).select("id");
	const lastId = lastRecord?.id ? getNumericSuffix(lastRecord.id, prefix) : 0;
	return `${prefix}${lastId + 1}`;
};

export async function createAuthor(
	name: string,
	age: number,
	address: string,
	cloudinary_id?: string,
	image?: string
) {
	try {
		const author = new Author({
			id: await nextIdentifier(Author, "author"),
			author: name,
			age,
			address,
			image: image || avatar.author,
			cloudinary_id,
		});
		const result = await author.save();
		return result;
	} catch (error) {
		return new Promise((resolve: any, reject: any) => {
			reject(error);
		});
	}
}

export async function createBook(
	authorid: string,
	name: string,
	isPublished: boolean,
	serialNumber: number | string,
	website?: string,
	image?: string,
	cloudinary_id?: string
) {
	try {
		const formattedSerial = `00${serialNumber}`.toString().slice(-4);
		const book = new Book({
			id: await nextIdentifier(Book, "book"),
			authorid,
			name,
			isPublished,
			serialNumber: formattedSerial,
			image: image || avatar.book,
			website,
			cloudinary_id,
		});

		const result = await book.save();
		return result;
	} catch (error) {
		return new Promise((resolve: any, reject: any) => {
			reject(error);
		});
	}
}
export async function createUsers(
	firstName: string,
	lastName: string,
	email: string,
	phoneNumber: string,
	password: string,
	dob: Date,
	image?: string
) {
	try {
		const users = new Users({
			firstName,
			lastName,
			dob,
			email,
			phoneNumber,
			password,
			image: image || avatar.user,
		});

		const result = await users.save();
		//console.log(result);
		return result;
	} catch (error) {
		//console.log(error);
		let res: any = error;
		return new Promise((resolve: any, reject: any) => {
			reject(res);
		});
	}
}

export async function findAuthUsers(email: string) {
	try {
		const users = await Users.find({ email });
		//console.log(users);
		return users;
	} catch (error) {
		//console.log(error);
		return error;
	}
}

export async function getAllAuthorsModel(pageNumber = 1) {
	try {
		const pageSize = 5;
		const safePage = pageNumber > 0 ? pageNumber : 1;
		const [authors, total] = await Promise.all([
			Author.find()
				.sort({ createdAt: -1 })
				.skip((safePage - 1) * pageSize)
				.limit(pageSize),
			Author.countDocuments(),
		]);

		return {
			items: authors,
			meta: {
				page: safePage,
				pageSize,
				total,
				totalPages: Math.ceil(total / pageSize),
			},
		};
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
export async function getOneAuthor(authorid: string) {
	try {
		const author = await Author.findOne({ id: authorid });
		return author;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
export async function getAllBooksByAuthorModel(
	authorId: string,
	pageNumber = 1
) {
	try {
		const pageSize = 5;
		const safePage = pageNumber > 0 ? pageNumber : 1;
		const [books, total] = await Promise.all([
			Book.find({ authorid: authorId })
				.sort({ createdAt: -1 })
				.skip((safePage - 1) * pageSize)
				.limit(pageSize),
			Book.countDocuments({ authorid: authorId }),
		]);

		return {
			items: books,
			meta: {
				page: safePage,
				pageSize,
				total,
				totalPages: Math.ceil(total / pageSize),
			},
		};
	} catch (error) {
		return error;
	}
}

export async function getOneBook(id: string) {
	try {
		const books = await Book.findOne({ id });
		return books;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}

// update document
export async function updateAuthorModel(
	authorId: string,
	name?: string,
	age?: number,
	address?: string,
	image?: string
) {
	try {
		const author = await Author.findOne({ id: authorId });

		if (!author) return null;

		if (typeof name === "string") author.set({ author: name });

		if (typeof age === "number") author.set({ age });

		if (typeof address === "string") author.set({ address });

		if (typeof image === "string" && image.length > 0) {
			author.set({ image });
		}

		await author.save();
		return author;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}
// update books by _id
export async function updateBookModel(
	bookId: string,
	authorId?: string,
	name?: string,
	isPublished?: boolean,
	serialNumber?: number,
	image?: string,
	website?: string
) {
	try {
		const book = await Book.findOne({ id: bookId });

		if (!book) return null;

		if (typeof name === "string") book.set({ name });

		if (typeof authorId === "string") book.set({ authorid: authorId });

		if (typeof isPublished === "boolean") book.set({ isPublished });

		if (typeof serialNumber === "number")
			book.set({ serialNumber: `00${serialNumber}` });

		if (typeof image === "string" && image.length > 0) {
			book.set({ image });
		}

		if (typeof website === "string") {
			book.set({ website });
		}

		await book.save();
		return book;
	} catch (error) {
		return new Promise((resolve, reject) => {
			reject(error);
		});
	}
}

export const deleteAuthorModel = async (authorId: string) => {
	const delAuthors = await Author.deleteOne({ id: authorId });
	const delBooks = await deletebookbyauthor(authorId)
	return { delAuthors, delBooks };
};

export const deleBookModel = async (bookId: string) => {
	const delBooks = await Book.deleteMany({ id: bookId });
	//console.log(delBooks);
	return delBooks;
};

// helper method for deleteAuthorModel
async function deletebookbyauthor(id: string) {
	const delBooks = await Book.deleteMany({authorid:id})
	return new Promise((resolve, reject) => {
		resolve(delBooks)
	})
}
