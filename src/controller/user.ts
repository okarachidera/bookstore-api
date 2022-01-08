import  { Request, Response} from "express";
import { User } from "../model/user";
import jwt from "jsonwebtoken";

const mySecret='PassPass'

export function registerUser(req: Request, res: Response) {
  let [fullname, email, password, dateOfBirth] = [
    req.body.fullname,
    req.body.email,
    req.body.password,
    req.body.dateOfBirth,
  ];
  if (!fullname || !email || !password || !dateOfBirth) {
    return res.status(400).send({ response: "All fields are required" });
  }
  try {
    let newuser = new User(fullname, email, password, dateOfBirth);
    res.status(200).send({message:'Account created'});
  } catch (error) {
    if (error) {
      res.status(400).send({ message: "Account already exist" });
      console.error(error);
    }
  }
}

export function loginUser(req: Request, res: Response) {
  let email = req.body.email;
  let password = req.body.password;
  if (email && password) {
    let loginStatus = User.userLogin(email, password);
    if (loginStatus=='Access Granted') {
      jwt.sign({ email,password }, mySecret, (err:any, token:any) => {
        console.log(token);  
        res.json({loginStatus,token});
    });

    }else{
      res.status(401).send({message: loginStatus})
    }
  } else {
    res.status(400).send({ message: "Password and Email Required" });
  }
}
