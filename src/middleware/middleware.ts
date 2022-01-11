import Joi from "joi";
import express, { Request, Response, NextFunction } from "express";

// login middleware
export const loginPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().max(30).required(),
    password: Joi.string().max(255).required(),
  });
  const { email, password } = req.body;
  const { error }: any = schema.validate({ email, password });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};



// get  author by id
export const oneauthorPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    authorId: Joi.string().max(30).regex(/^author/).required(),
  });
  const { authorId} = req.params;
  const { error }: any = schema.validate({ authorId});
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// get all books by  author
export const authorbooksPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    authorId: Joi.string().max(30).regex(/^author/).required(),
    pageno: Joi.number().max(255).required(),
  });
  const { authorId, pageno } = req.params;
  const { error }: any = schema.validate({ authorId, pageno });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// create books
export const createbooksPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    authorId: Joi.string().max(30).regex(/^author/).required(),
    name: Joi.string().max(255).required(),
    isPublished: Joi.boolean().required(),
    serialNumber: Joi.number().required()
  });
  const {authorId}=req.params
  const { name,isPublished,serialNumber } = req.body;
  const { error }: any = schema.validate({ authorId, name,isPublished,serialNumber });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// create author
export const createauthorPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    author: Joi.string().min(2).max(255).required(),
    age: Joi.number().required(),
    address: Joi.string().min(2).max(255).required()
  });
  const { author,age,address } = req.body;
  const { error }: any = schema.validate({ author,age,address });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// update author validation
export const updateauthorPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255),
    age: Joi.number(),
    address: Joi.string().min(2).max(255),
    id: Joi.string().regex(/^author/).required()
  });
  const {id}=req.params
  const { name,age,address } = req.body;
  const { error }: any = schema.validate({ id,name,age,address });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// update book validation
export const updatebookPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255),
    isPublished: Joi.boolean(),
    serialNumber: Joi.number(),
    bookId: Joi.string().regex(/^book/).required(),
    authorId: Joi.string().regex(/^author/)
  });
  const {bookId}=req.params
  const { name,isPublished,serialNumber,authorId } = req.body;
  const { error }: any = schema.validate({ bookId,name,isPublished,serialNumber,authorId });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// delete author validation
export const deleteauthorPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    id: Joi.string().regex(/^author/).required()
  });
  const {id}=req.params
  const { error }: any = schema.validate({ id });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// delete book validation
export const deletebookPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    bookId: Joi.string().regex(/^book/).required()
  });
  const {bookId}=req.params
  const { error }: any = schema.validate({ bookId });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};
// signup middleware
export const signupPolicy = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().max(30).required(),
    phoneNumber: Joi.string().min(11).max(11).required(),
    password: Joi.string().max(30).required(),
    dateOfBirth: Joi.date()
      .max("01-01-2019")
      .iso()
      .messages({
        "date.format": `Date format is YYYY-MM-DD`,
        "date.max": `Age must be 4+`,
      })
      .required(),
  });
  const { firstName, lastName, email, password, dateOfBirth, phoneNumber } = req.body;
  const { error }: any = schema.validate({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    phoneNumber,
  });
  if (error) {
    return res.status(500).json({ message: error.details[0].message.split('"').join("") });
  }
  return next();
};



// Books 