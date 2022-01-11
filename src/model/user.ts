import bcrypt from "bcrypt";
import express, { NextFunction, Response, Request } from "express";
import { findAuthUsers, createUsers } from "./db";

// findAuthUsers

interface userInt {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: any;
  phoneNumber: string;
  password: any;
}

interface reqObj extends Request {
  token: string;
}
interface demoInterface extends Request {
  foundUser: string | object;
}

// pasword bcrypt password
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';

export class User implements userInt {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: any;
  phoneNumber: string;
  password: any;

  static verifyToken(req: reqObj, res: any, next: any) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403); //forbidden
    }
  }
  static async userLogin(email: string, password: string) {
    let loginStatus = "No account found";

    let foundUser: any = await findAuthUsers(email);
    //console.log(foundUser);

    if (foundUser.length > 0) {
      // Load hash from your password DB.
      if (bcrypt.compareSync(password, foundUser[0]["password"])) {
        //console.log(foundUser);
        loginStatus = "Access Granted";
      } else {
        loginStatus = "Incorrect Credentials";
      }
    }
    //console.log(loginStatus);

    return loginStatus;
  }

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dateOfBirth: any,
    phoneNumber: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.phoneNumber = phoneNumber;
  }
}
