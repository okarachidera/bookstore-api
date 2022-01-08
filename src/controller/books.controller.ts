import express, { Request, Response, NextFunction } from "express";
import { readFile, writeFile, author } from "../utils/utils";
import { generateIdsForBooks, validateEntry } from "../utils/utils";
import jwt from "jsonwebtoken";

const mySecret = "PassPass";

export const getAllAuthor = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      res.status(200).send({ message: "status", data });
    }
  });
};

export const getAuthor = (req: any, res: Response, _next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const authorProfile = data.find(
        (item: author) => `${item.id}` === req.params.id
      );
      if (!authorProfile) {
        return res
          .status(404)
          .json({ message: `author with the id ${req.params.id} not found` });
      }
      res.status(200).json({ message: "success", data: authorProfile });
    }
  });
};

export const getABook = (req: any, res: Response, _next: NextFunction) => {
  // jwt.verify()
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const authorProfile = data.find(
        (item: author) => `${item.id}` === req.params.authorId
      );
      if (!authorProfile) {
        return res.status(404).json({
          message: `author with the id ${req.params.authorId} not found`,
        });
      }
      const bookData = authorProfile.books.find(
        (item: author) => `${item.id}` === req.params.bookId
      );
      if (!bookData) {
        return res
          .status(404)
          .json({ message: `book with the id ${req.params.bookId} not found` });
      }
      res.status(200).json({ mesaage: "success", data: bookData });
    }
  });
};

export const postAuthor = (req: any, res: Response) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      console.log(req.body, "****");
      const { error } = validateEntry(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      } else {
        const data = readFile();
        const newBook = {
          ...req.body,
          books: generateIdsForBooks(req.body.books),
        };
        const newData = {
          id: parseInt(data[data.length - 1]["id"]) + 1,
          dateRegistered: new Date().getTime(),
          ...newBook,
        };
        const allNewData = [...data, newData];
        writeFile(allNewData);
        res.status(201).json({ message: "creates new author", data: newData });
      }
    }
  });
};

export const postBook = (req: any, res: Response) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      let authorFind = data.find(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.authorId
      );
      if (!authorFind)
        return res.status(404).json({ message: "author does not exist" });

      authorFind = {
        ...authorFind,
        books: [
          ...authorFind.books,
          { id: `book${authorFind.books.length + 1}`, ...req.body },
        ],
      };

      // new search
      let dataIndex = data.findIndex(
        (a: any) => a["id"] == req.params.authorId
      );
      data.splice(dataIndex, 1, authorFind);
      writeFile(data);
      res.status(201).json({ message: "new book added", author: data });
    }
  });
};

export const updateAuthor = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const dataToUpdate = data.find(
        (item: { item: author; id: number }) => `${item.id}` === req.params.id
      );
      if (!dataToUpdate)
        return res.status(404).json({ message: "does not exist" });

      const newData = { ...dataToUpdate, ...req.body };
      const dataIndex = data.findIndex(
        (item: { id: number }) => `${item.id}` === req.params.id
      );
      data.splice(dataIndex, 1, newData);
      writeFile(data);
      console.log(dataToUpdate);
      res.status(201).json({ message: "updates an author", data: newData });
    }
  });
};

export const updateBook = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const authorFind = data.find(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.authorId
      );
      if (!authorFind)
        return res.status(404).json({
          message: `author with the id ${req.params.authorId} does not exist`,
        });

      const bookToUpdate = authorFind.books.find(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.bookId
      );
      if (!bookToUpdate)
        return res.status(404).json({
          message: `book with the id ${req.params.bookId} does not exist`,
        });

      const newData = { ...bookToUpdate, ...req.body };
      const dataIndex = authorFind.books.findIndex(
        (item: author) => `${item.id}` === req.params.bookId
      );
      authorFind.books.splice(dataIndex, 1, newData);
      writeFile(authorFind.books);
      res.status(201).json({ messag: "updates a book", data: newData });
    }
  });
};

export const deleteAuthor = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const dataToDelete = data.find(
        (item: { item: author; id: number }) => `${item.id}` === req.params.id
      );
      if (!dataToDelete) {
        return res.status(404).json({ message: "not found" });
      }

      const dataIndex = data.findIndex(
        (item: { item: author; id: number }) => `${item.id}` === req.params.id
      );
      data.splice(dataIndex, 1);
      writeFile(data);
      res.status(200).json({ message: "Trashed!", data: data });
    }
  });
};

export const deleteBook = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = readFile();
      const authorFind = data.find(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.authorId
      );
      if (!authorFind)
        return res.status(404).json({
          message: `author with the id ${req.params.authorId} does not exist`,
        });

      const bookToDelete = authorFind.books.find(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.bookId
      );
      if (!bookToDelete)
        return res.status(404).json({
          message: `book with the id ${req.params.bookId} does not exist`,
        });

      let dataIndex = authorFind.books.findIndex(
        (item: { item: author; id: number }) =>
          `${item.id}` === req.params.bookId
      );
      authorFind.books.splice(dataIndex, 1);
      writeFile(data);
      res.status(200).json({
        message: `Book with the id ${req.params.bookId} has been trashed`,
        Index: dataIndex,
      });
    }
  });
};
