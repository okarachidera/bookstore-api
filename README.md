# Implemented this API using Express, TypeScript and MongoDB

- The authors and books collection.
### Authors collection
   - Author name
   - Age 
   - Address
   - createdAt
   - updatedAt
### Books collection
   - AuthorId
   - Book name
   - Published status
   - Date published
   - Serial number
   - createdAt
   - updatedAt
### Users collection for authentication and authorization
   - firstName
   - lastname
   - DOB
   - email (unique)
   - phone number (unique)
   - createdAt
   - updatedAt

## The application should be able to perform.
- GET Request returns all the data from respective collection
- POST Request adds data to your authors, books and Users collection.
- PUT Request updates document in a particular collection
- DELETE Request removes a document from the collection using the id

## Other features
- Implemented pagination for both Authors and Books table, `with limit of 5 values for each page`
- Created Authentication and Authorization for users using a middleware function
- Implement Validation for incoming request using  **Joi**
- Only registered users can access all `endpoints`
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

### Test Coverage
- Test database using mongodb-memory-server
- Tested all endpoints `(GET, POST, PUT, DELETE)`

### Hosting
- Hosted application on Heroku
- https://book-test-api.herokuapp.com/

### Documentation
- documentation of API done with postman
- https://documenter.getpostman.com/view/18331158/UVXhpG9q
