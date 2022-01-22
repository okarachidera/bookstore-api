1.  db.restaurants.find({"name": /.Reg./},{"restaurant_id" : 1, "name":1,"borough":1, "cuisine":1})

2.  db.restaurants.find({ "borough": "Bronx",
    $or : [{ "cuisine" : "American" }, { "cuisine" : "Chinese" }]});

3.  db.restaurants.find(
    {"borough" :{$in :["Staten Island","Queens","Bronx","Brooklyn"]}},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1 });

4.  db.restaurants.find(
    {"borough" :{$nin :["Staten Island","Queens","Bronx","Brooklyn"]}},
    {
    "restaurant_id" : 1,
    "name":1,"borough":1,
    "cuisine" :1});

5.  db.restaurants.find(
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

6.  db.restaurants.find(
    {$or: [
      {name: /^Wil/}, 
      {"$and": [
    {"cuisine" : {$ne :"American "}},
    {"cuisine" : {$ne :"Chinees"}}
    ]}
    ]}
    ,{"restaurant_id" : 1,"name":1,"borough":1,"cuisine" :1});

7.  db.restaurants.find(
    {
    "grades.date": ISODate("2014-08-11T00:00:00Z"),
    "grades.grade":"A" ,
    "grades.score" : 11
    },
    {"restaurant_id" : 1,"name":1,"grades":1});

8.  db.restaurants.find(
    { "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
    "grades.1.grade":"A" ,
    "grades.1.score" : 9
    },
    {"restaurant_id" : 1,"name":1,"grades":1})

9.  db.restaurants.find(
    {
    "address.coord.1": {$gt : 42, $lte : 52}
    },
    {"restaurant_id" : 1,"name":1,"address":1,"coord":1}
    );

10. db.restaurants.find().sort({"name":1});

11. db.restaurants.find().sort(
    {"name":-1}
    );

12. db.restaurants.find().sort(
    {"cuisine":1,"borough" : -1,}
    );

13. db.restaurants.find(
    {"address.street" :
    { $exists : true }
    }
    );
