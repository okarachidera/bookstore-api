# week-9-task-node-sq009

# Task

# 1. NO_SQL

### Implement this task using MongoDB

### Clarification
- Convert your week-7/week-7 task database into a NOSQL DB using `MONGODB`.
- Seperate the authors and books data.
Authors collection
   - Author name
   - Age 
   - Address
   - createdAt
   - updatedAt
Books collection
   - AuthorId
   - Book name
   - Published status
   - Date published
   - Serial number
   - createdAt
   - updatedAt
Users collection for authentication and authorization
   - firstName
   - lastname
   - DOB
   - email (unique)
   - phone number (unique)
   - createdAt
   - updatedAt
- Implement all functionalities as in the previous tasks
- Implement pagination for both Authors and Books table, `with limit of 5 values for each page`
- Create Authentication and Authorization for users using a middleware function
- Implement Validation for incoming request using  **Joi**
- Only registered users can access all `endpoints`
- Use mongoDB-compass for local development
- Authors data format:
```js
{
    previous:1,
    next:3,
    data:[
         { 
            "id": "author1"
            "author": "John Doe",
            "age": 28,
            "address" : "5, Wall Street, Buckingham",
            "createdAt": "2021-08-26T09:12:53.752Z",
            "updatedAt": "2021-08-26T09:12:53.752Z",
         } 
        ]
}
```

- Books data format:
```js
{
    previous:0,
    next:2,
    data:[
         { 
            "id": "book1",
            "authorId": "author1",
            "name": "Tomorrow is coming",
            "isPublished": true,
            "datePublished": 1637159508581,
            'serialNumber': 0010,
            "createdAt": "2021-08-26T09:12:53.752Z",
            "updatedAt": "2021-08-26T09:12:53.752Z",
         } 
        ]
}
```

### Test Coverage (Test is mandatory. No tests equals zero(0) marks):
- Test your database using mongodb-memory-server
- Test all endpoints `(GET, POST, PUT, DELETE)`

### Hosting
- Host your application on Heroku

### Documentation
- document your API with postman


# 2. Mongo Aggregation Exercise.
- Go through the readme file in the Folder `MongoAggregation`
