# week-6-NODE-009-POD-B
# EXPRESS 

### Setup
1. Your are required to use TypeScript for the task
2. Use and setup the project with `Yarn`

## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) into a file database.json, document and publish your endpoints using postman.

## How will I complete this project?
- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database.json data
  - `POST` Request which adds data to your database.json file (Note: If there is no database.json on post, create one dynamically).
  - `PUT` Request which updates fields of a particular data using the id in database.json
  - `DELETE` Request which removes a particular data from your database.json using the id
- Host your application on Heroku
- Data format example:

```javascript
[
    {
      id: 1,
      author: "John Stone",
      dateRegistered: 1637159465420,
      age: 28,
      address: "5, Wall Street, Buckingham",
      books: [
        {
          id: "book1"
          name: "Tomorrow is coming",
          isPublished: true,
          datePublished: 1637159508581,
          serialNumber: 0010
        },
        {
          id: "book2"
          name: "October's very own",
          isPublished: false,
          datePublished: null,
          serialNumber: null
        }
      ]
    }
]
```
## Test coverage
- Make sure you write test to cover your application using supertest

### Test
- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes

### FRONTEND TASK
- Implement a frontend for your api.
- Your frontend should have a page that displays all authors in your database with a button to add author, 
button to delete an author from the database, 
button to edit author
- A page for a single author showing the books of that author with a button to add books for that author, 
button to delete a book
