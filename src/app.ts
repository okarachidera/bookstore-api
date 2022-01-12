import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import booksRouter from './routes/books'
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config()


import indexRouter from './routes/index';
import usersRouter from './routes/users';
// import { startDB } from './model/db';
import { connectDB, connectTestDB } from './database/mem';



const app = express();

app.use(cors());

// view engine setup
// app.set('views', path.join(__dirname, '../views'));
// app.set('view engine', 'jade');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// connect db
if(process.env.NODE_ENV === 'test'){
  connectTestDB()
}else{
  connectDB()
}

console.log(process.env.NODE_ENV,process.env.JWT_SECRET_KEY);

// connectDB()

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/author', booksRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set('view engine', 'ejs')


// error handler
app.use(function(err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

export default app;
