import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt"
import express, { NextFunction, Response, Request } from 'express';


interface userInt {
  id: any;
  fullname: string;
  email: string;
  dateOfBirth:any;
  password: string;
}

interface reqObj extends Request {
  token: string 
}

let pathOut = path.join(__dirname, "../../users.json");
// pasword bcrypt password
const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';

export class User implements userInt {
  id: any;
  fullname: string;
  email: string;
  dateOfBirth:any
  password: any;
  
  static verifyToken(req:reqObj, res:any, next:any) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403) //forbidden
    }
}
  static userLogin(email:string,password:string){
   let loginStatus='No account found'
   let data= User.readUserAccounts()
   let dataParsed=JSON.parse(data)
   let foundUser=dataParsed.find((e:any)=>e['email']==email)
   if(foundUser){
     // Load hash from your password DB.
     if(bcrypt.compareSync(password, foundUser['password'])){
       console.log(foundUser);
       loginStatus='Access Granted'
     }else{
       loginStatus='Incorrect Credentials'
     }

   }
   console.log(loginStatus);
   
   return loginStatus
   
  }
  static readUserAccounts(){
    let readData = fs.readFileSync(pathOut, { encoding: "utf-8" })
    return readData
  }
  static writeUserAccounts(data:any){
    fs.writeFileSync(pathOut, JSON.stringify(data, null, 4), {
      encoding: "utf-8",
    });
  }

  constructor(fullname: string, email: string, password: string, dateOfBirth:any) {
    this.id = uuidv4();
    this.fullname = fullname;
    this.email = email;
    this.dateOfBirth=dateOfBirth
    // Technique 2 (auto-gen a salt and hash):
    this.password = bcrypt.hashSync(password, saltRounds);
    this.createuser();
  }

  private createuser() {
    let data = [];
    let user = {
      id: this.id,
      fullname: this.fullname,
      email: this.email,
      dateOfBirth:this.dateOfBirth,
      password: this.password,
    };
    let readData = User.readUserAccounts();
    if (readData) {
      data = JSON.parse(readData);
      let dublicateData = data.find((a: any) => a["email"] == user["email"]);
      if (dublicateData){
          throw new Error("Account already Exist");          
      }
      else data.push(user);
    }
    else{
        data.push(user);
    } 

    User.writeUserAccounts(data)
    
  }
}

