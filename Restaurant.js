
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

async function getRestaurants1() {
return await Restaurant.find({"name": /.*Reg.*/},
  {"restaurant_id" : 1, "name":1,"borough":1, "cuisine":1})
}

async function rest1() {
  const restaurants = await getRestaurants1();
  console.log(restaurants);
}
// rest1();


async function getRestaurants2() {
return await Restaurant.find({ "borough": "Bronx", 
  $or : [{ "cuisine" : "American" }, { "cuisine" : "Chinese" }] 
  });
}
async function rest2() {
  const restaurants = await getRestaurants2();
  console.log(restaurants);
}
// rest2();


async function getRestaurants3() {
return await Restaurant.find(
  {"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
  {
  "restaurant_id" : 1,
  "name":1,"borough":1,
  "cuisine" :1
  }
  );
}
async function rest3() {
  const restaurants = await getRestaurants3();
  console.log(restaurants);
}
// rest3();



async function getRestaurants4() {
return await Restaurant.find(
  {"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
  {
  "restaurant_id" : 1,
  "name":1,"borough":1,
  "cuisine" :1
  });
}
async function rest4() {
  const restaurants = await getRestaurants4();
  console.log(restaurants);
}
// rest4();



async function getRestaurants5() {
return await Restaurant.find(
  {"grades.score" : 
  { $not: 
  {$gt : 10}
  }
  },
  {
  "restaurant_id" : 1,
  "name":1,"borough":1,
  "cuisine" :1
  });
}
async function rest5() {
  const restaurants = await getRestaurants5();
  console.log(restaurants);
}
// rest5();



async function getRestaurants6() {
return await Restaurant.find(
  {$or: [
    {name: /^Wil/}, 
    {"$and": [
         {"cuisine" : {$ne :"American "}}, 
         {"cuisine" : {$ne :"Chinees"}}
     ]}
  ]}
  ,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1}
  );  
}
async function rest6() {
  const restaurants = await getRestaurants6();
  console.log(restaurants);
}
// rest6();


async function getRestaurants7() {
return await Restaurant.find( 
  {
    "grades.date": ISODate("2014-08-11T00:00:00Z"), 
    "grades.grade":"A" , 
    "grades.score" : 11
  }, 
  {"restaurant_id" : 1,"name":1,"grades":1});
}
async function rest7() {
  const restaurants = await getRestaurants7();
  console.log(restaurants);
}
// rest7();



async function getRestaurants8() {
return await Restaurant.find( 
  { "grades.1.date": ISODate("2014-08-11T00:00:00Z"), 
    "grades.1.grade":"A" , 
    "grades.1.score" : 9
  }, 
   {"restaurant_id" : 1,"name":1,"grades":1});
}
async function rest8() {
  const restaurants = await getRestaurants8();
  console.log(restaurants);
}
// rest8();


async function getRestaurants9() {
return await Restaurant.find( 
  { 
    "address.coord.1": {$gt : 42, $lte : 52}
  },
    {"restaurant_id" : 1,"name":1,"address":1,"coord":1});
}
async function rest9() {
  const restaurants = await getRestaurants9();
  console.log(restaurants);
}
// rest9();


async function getRestaurants10() {
return await Restaurant.find().sort({"name":1});
}
async function rest10() {
  const restaurants = await getRestaurants10();
  console.log(restaurants);
}
// rest10();


async function getRestaurants11() {
return await Restaurant.find().sort(
  {"name":-1});
}
async function rest11() {
  const restaurants = await getRestaurants11();
  console.log(restaurants);
}
// rest11();


async function getRestaurants12() {
return await Restaurant.find().sort(
  {"cuisine":1,"borough" : -1,});
}
async function rest12() {
  const restaurants = await getRestaurants12();
  console.log(restaurants);
}
// rest12();


async function getRestaurants13() {
return await Restaurant.find(
  {"address.street" : 
      { $exists : true } 
  });
}
async function rest13() {
  const restaurants = await getRestaurants13();
  console.log(restaurants);
}
// rest13();
