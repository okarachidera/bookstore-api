import mongoose, { connect } from "mongoose";

export const connectDB = () => {
  // const url = `mongodb+srv://bookshop:Passw0rd@cluster0.xqrkq.mongodb.net/myBookStore?retryWrites=true&w=majority`;
  return mongoose.connect(`${process.env.MONGO_URL}`);
};

export const startDB = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
  }
};

const authorSchema = new mongoose.Schema(
  {
    id: String,
    author: String,
    age: Number,
    address: String,
  },
  { timestamps: true }
);

const bookSchema = new mongoose.Schema({
  id: String,
  authorid: {
    type: mongoose.Schema.Types.String,
    ref: "Author",
  },
  name: String,
  isPublished: Boolean,
  datePublished: { type: Date, default: Date.now },
  serialNumber: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const usersSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", bookSchema);
const Author = mongoose.model("Author", authorSchema);
export const Users = mongoose.model("Users", usersSchema);

export async function createAuthor(name: string, age: number, address: string) {
  try {
    let data = await Author.find();
    let lastAuthorId = 0;
    if (data.length > 0) {
      lastAuthorId = parseInt(data[data.length - 1].id.split("r")[1]);
    }
    const author = new Author({
      id: `author${lastAuthorId + 1}`,
      author: name,
      age,
      address,
    });
    const result = await author.save();
    console.log(result);
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
  isPublished: Boolean,
  serialNumber: number
) {
  try {
    let data = await Book.find();
    let lastBookId = 0;
    if (data.length > 0) {
      lastBookId = parseInt(data[data.length - 1].id.split("k")[1]);
    }

    const book = new Book({
      id: `book${lastBookId + 1}`,
      authorid: authorid,
      name: name,
      isPublished: isPublished,
      serialNumber: `00${data.length - 1}`,
    });

    const result = await book.save();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
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
  dob: Date
) {
  try {
    const users = new Users({
      firstName,
      lastName,
      dob,
      email,
      phoneNumber,
      password,
    });
    const result = await users.save();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    let res: any = error;
    return new Promise((resolve: any, reject: any) => {
      reject(res);
    });
  }
}

export async function findAuthUsers(email: string) {
  try {
    const users = await Users.find({ email });
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllAuthorsModel(pageNumber: number) {
  try {
    let pageSize = 5;
    const authors = await Author.find().skip(pageNumber).limit(pageSize);
    console.log(authors);
    return authors;
  } catch (error) {
    console.log(error);
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}
export async function getOneAuthor(authorid: string) {
  try {
    const author = await Author.find({ id: authorid });
    return author;
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}
export async function getAllBooksByAuthorModel(authorId: string, pageNumber: number) {
  try {
    let pageSize = 5;
    const books = await Book.find({ authorid: authorId }).skip(pageNumber).limit(pageSize);
    console.log(books);
    return books;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getOneBook(id: string) {
  try {
    const books = await Book.find({ id });
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
  address?: string
) {
  try {
    console.log(name);

    let data = await Author.find({ id: authorId }).limit(1).select({ _id: 1 });

    const result = await Author.findById(data);

    if (!result) return;

    if (name) result.set({ author: name });

    if (age) result.set({ age: age });

    if (address) result.set({ address: address });

    result.save();
    return result;
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
  serialNumber?: number
) {
  try {
    let data = await Book.find({ id: bookId }).limit(1).select({ _id: 1 });

    const result = await Book.findById(data);

    if (!result) return;

    if (name) result.set({ name: name });

    if (authorId) result.set({ authorid: authorId });

    if (isPublished) result.set({ isPublished: isPublished });

    if (serialNumber) result.set({ serialNumber: `00${serialNumber}` });

    result.save();
    return result;
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}

export const deleteAuthorModel = async (authorId: string) => {
  const delAuthors = await Author.deleteOne({ id: authorId });
  const delBooks = await Book.deleteMany({ authorId: authorId });
  return { delAuthors, delBooks };
};

export const deleBookModel = async (bookId: string) => {
  const delBooks = await Book.deleteMany({ id: bookId });
  console.log(delBooks);
  return delBooks;
};
// createBook("author2", "believing", true, 2);
// createAuthor("odochi", 28, "no 3 oilserve close transwoji");

// getAllBooksByAuthor('author1',1,5)

// createUsers('chidera','okara','okara.chidera@jafa.com','0900645533','1234');
// getAllAuthor(1,5)
// findAuthUsers('okara.chidera@gmail.com','12345')
