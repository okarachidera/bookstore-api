import { array } from "joi";
import mongoose, { connect } from "mongoose";

// const restuarantSchema = new mongoose.Schema({
//   address: {
//     building: String,
//     coord: Array,
//     street: String,
//     zipcode: String,
//   },
//   borough: String,
//   cuisine: String,
//   grades: Array,
//   name: String,
//   restaurant_id: String,
// });


// const Restuarant = mongoose.model("Restuarant", restuarantSchema);

// async function getAllRestaurants() {
//   //console.log("sdsdsds");
//   let result = myBookStore.restuarant.find();
//   //console.log(result);

//   return result;
// }

// getAllRestaurants();


const MongoClient = require('mongodb').MongoClient;
const url = `mongodb+srv://bookshop:Passw0rd@cluster0.xqrkq.mongodb.net/myBookStore?retryWrites=true&w=majority`;

MongoClient.connect(url, function(err: any, db:any) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("restuarant").findOne({});
});