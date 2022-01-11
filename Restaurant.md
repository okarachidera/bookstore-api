//1.   return await Restaurant.find({"name": /.Reg./},
//   {"restaurant_id" : 1, "name":1,"borough":1, "cuisine":1})
// }


//2. return await Restaurant.find({ "borough": "Bronx", 
//   $or : [{ "cuisine" : "American" }, { "cuisine" : "Chinese" }] 
//   });
// }


//3. return await Restaurant.find(
//   {"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
//   {
//   "restaurant_id" : 1,
//   "name":1,"borough":1,
//   "cuisine" :1
//   }
//   );
// }


//4. return await Restaurant.find(
//   {"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
//   {
//   "restaurant_id" : 1,
//   "name":1,"borough":1,
//   "cuisine" :1
//   });
// }


//5. return await Restaurant.find(
//   {"grades.score" : 
//   { $not: 
//   {$gt : 10}
//   }
//   },
//   {
//   "restaurant_id" : 1,
//   "name":1,"borough":1,
//   "cuisine" :1
//   }
//   );
// }


//6. return await Restaurant.find(
//   {$or: [
//     {name: /^Wil/}, 
//     {"$and": [
//          {"cuisine" : {$ne :"American "}}, 
//          {"cuisine" : {$ne :"Chinees"}}
//      ]}
//   ]}
//   ,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1}
//   );  
// }


//7. return await Restaurant.find( 
//   {
//     "grades.date": ISODate("2014-08-11T00:00:00Z"), 
//     "grades.grade":"A" , 
//     "grades.score" : 11
//   }, 
//   {"restaurant_id" : 1,"name":1,"grades":1}
// );
// }


//8. return await Restaurant.find( 
//   { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), 
//     "grades.1.grade":"A" , 
//     "grades.1.score" : 9
//   }, 
//    {"restaurant_id" : 1,"name":1,"grades":1}
// );
// }

//9. return await Restaurant.find( 
//   { 
//     "address.coord.1": {$gt : 42, $lte : 52}
//   },
//     {"restaurant_id" : 1,"name":1,"address":1,"coord":1}
// );
// }


//10. return await Restaurant.find().sort({"name":1});
// }


//11. return await Restaurant.find().sort(
//   {"name":-1}
//   );
// }

//12. return await Restaurant.find().sort(
//   {"cuisine":1,"borough" : -1,}
//  );
// }

return await Restaurant.find(
  {"address.street" : 
      { $exists : true } 
  } 
);
}


async function run() {
  const restaurants = await getRestaurants();
  console.log(restaurants);
}
run();