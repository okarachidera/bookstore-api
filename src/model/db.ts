import mongoose  from "mongoose";

const url = `mongodb+srv://bookshop:Passw0rd@cluster0.ettmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


mongoose.connect(url)
    .then(() => console.log('Connected to database '))
    .catch(err => console.error(`Error connecting to the database. \n${err}`))


    