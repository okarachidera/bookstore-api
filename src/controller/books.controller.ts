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

const mySecret = "PassPass";

export const getAllAuthor = async (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, async function (err: any, data: any) {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      const data = await getAllAuthorsModel(req.param.pagno);
      res.status(200).send({ message: "status", data });
    }
  });
};

export const getAuthor = (req: any, res: Response, _next: NextFunction) => {
  jwt.verify(req.token, mySecret, async function (err: any, data: any) {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        const data = await getOneAuthor(req.params.id);
        res.status(200).json({ message: "success", data: data });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  });
};

export const getAllBooksForAuthor = async (req: any, res: Response, _next: NextFunction) => {
  // jwt.verify()
  jwt.verify(req.token, mySecret, async function (err: any, data: any) {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        const data = await getAllBooksByAuthorModel(req.params.authorId, req.params.pageno);
        res.status(200).json({ response: "success", data });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  });
};

export const postAuthor = async (req: any, res: Response) => {
  jwt.verify(req.token, mySecret, async (err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        let { name, age, address } = req.body;
        let data = await createAuthor(name, age, address);
        res.status(201).json({ response: "success", data });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const postBook = async(req: any, res: Response) => {
  jwt.verify(req.token, mySecret, async(err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      let {name, isPublished,serialNumber } = req.body;
      let {authorId } = req.params;
      let data = await createBook(authorId, name, isPublished,serialNumber);
      res.status(201).json({ message: "new book added", author: data });
    }
  });
};

export const updateAuthor = (req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, async(err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        let authorId=req.params.id;
        let {author, age,address } = req.body;
  
        let data=await updateAuthorModel(authorId,author, age,address)
        res.status(201).json({ message: "updates an author", data });
        
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const updateBook = async(req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, async(err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {   
        let {bookId}=req.params;
        let {authorId, name,isPublished,serialNumber } = req.body;
        let data=await updateBookModel(bookId,authorId,name,serialNumber,isPublished)
        
        res.status(201).json({ message: "updates a book", data});
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const deleteAuthor = async(req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, async(err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        let {id}=req.params
        let data = await deleteAuthorModel(id)
        res.status(200).json({ message: "Trashed!", data });
       
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};

export const deleteBook = async(req: any, res: Response, next: NextFunction) => {
  jwt.verify(req.token, mySecret, async(err: any, data: any) => {
    if (err) {
      console.log(req.token);
      res.sendStatus(403);
    } else {
      try {
        let {bookId}=req.params
        let data=await deleBookModel(bookId)
        res.status(200).json({
          message: `Book with the id ${req.params.bookId} has been trashed`,
          data
        });
        
      } catch (error) {
        res.status(400).send(error);
      }
    }
  });
};
