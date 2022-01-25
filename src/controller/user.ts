import { Request, Response } from "express";
import { User } from "../model/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUsers } from "../model/db";
import { validateLogin } from "../utils/utils";

// pasword bcrypt password
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';

export async function registerUser(req: Request, res: Response) {
	try {
		let { firstName, lastName, email, password, dateOfBirth, phoneNumber } =
			req.body;
		// Technique 2 (auto-gen a salt and hash):
		let bcryptPassword = bcrypt.hashSync(password, saltRounds);
		let newuser = await createUsers(
			firstName,
			lastName,
			email,
			phoneNumber,
			bcryptPassword,
			dateOfBirth
		);
		res.status(201).send({ message: "Account created", newuser });
	} catch (error) {
		if (error) {
			res.status(400).send({ message: "Account already exist", error });
			console.error(error);
		}
	}
}

export async function loginUser(req: Request, res: Response) {
	let email = req.body.email;
	let password = req.body.password;
	let loginStatus = await User.userLogin(email, password);
	if (loginStatus == "Access Granted") {
		jwt.sign(
			{ email, password },
			process.env.JWT_SECRET_KEY as string,
			{
				expiresIn: process.env.JWT_EXPIRES_IN,
			},
			(err: any, token: any) => {
				res.json({ loginStatus, token });
			}
		);
	} else {
		res.status(401).send({ message: loginStatus });
	}
}


