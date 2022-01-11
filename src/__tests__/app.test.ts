import supertest from 'supertest'
import app from '../app'
import { Users } from '../model/db';


jest.useRealTimers();

let token: string;
let authorId: string;
let bookId: string;
let ID: string;



async function deletedata() {
    let result=await Users.deleteOne({email:loginData.email})
    return result;
}

const loginData = {
    firstName:"chidera",
    lastName:"okara",
    email:"odud@gmail.com",
    password:"1234",
    dateOfBirth:"1992-10-24",
    phoneNumber:"08767850845"
  };


  describe("POST /signup",()=>{
      it("return status code 201",async()=>{
        jest.setTimeout(300000);
          const res=await supertest(app)
          .post("/users/signup")
          .send(loginData)

          expect(res.statusCode).toEqual(201)
        expect(res.body.message).toBe("Account created");
        // done()
      })

      test("login", async () => {
        const response = await supertest(app)
          .post("/users/login")
          .send({ email: loginData.email, password: loginData.password });
        token = response.body.token;
        // console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.loginStatus).toBe("Access Granted");
    });
})



describe("authors", () => {
  const authorData = {
      author: "Hannah Montanna",
      age: 32,
      address: "7, Straight Street, Walls",
    };

  test("create author", async () => {
    const response = await supertest(app)
      .post("/author")
      .set("Authorization", `Bearer ${token}`)
      .send(authorData);
    authorId = response.body.data.id;
    ID = response.body.data.id;
    console.log(response.body.message,ID, 'CHIIDFJDFDFJD')
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("creates new author");
    expect(response.body.data.author).toBe(authorData.author);
  });

  test("update an author", async () => {
    const response = await supertest(app)
      .put(`/author/${authorId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(authorData);


    expect(response.status).toBe(201);
    expect(response.body.message).toBe("updates an author");
    // expect(response.body.author.author).toMatch("Charis Claire");
  });



  test("delete an author", async () => {
    const response = await supertest(app)
      .delete(`/author/${authorId}`)
      .set("Authorization", `Bearer ${token}`);
    //   console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Trashed!");
  });
});

describe("books", () => {

  const bookData = {
    name: "Sunrise",
    isPublished: true,
    serialNumber: 3
  };

  test("create a book", async () => {
    const response = await supertest(app)
      .post(`/author/${authorId}/book`)
      .set("Authorization", `Bearer ${token}`)
      .send(bookData);
    bookId = response.body.data.id
    console.log('ffdfdfdfdfd',bookId);
    
    expect(response.status).toBe(201);
  });

  test("get a book", async () => {
    const response = await supertest(app)
      .get(`/author/books/${authorId}/${0}`)
      .set("Authorization", `Bearer ${token}`);
      console.log(`/author/books/${authorId}/${bookId}/${0}`);
    //console.log(response.body.book.name);
    expect(response.status).toBe(200);
  });
  test("update a book", async () => {
    const response = await supertest(app)
      .put(`/author/book/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Sunset",
        isPublished: true,
        serialNumber: 9,
      });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("updates a book");
    expect(response.body.data.name).toMatch("Sunset");
  })

  test("delete a book", async () => {
    const response = await supertest(app)
      .delete(`/author/book/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    //   console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Book with the id ${bookId} has been trashed`);
  });
});




deletedata() 


// describe("Auth", () => {

  
// describe("books", () => {
//   const data = {
//     name: "Sunrise",
//     isPublished: true,
//     datePublished: "2022-01-09",
//     serialNumber: "0002",
//   };
//   test("create a book", async () => {
//     const response = await supertest(app)
//       .post(`/book/${ID}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(data);
//     //console.log(response.body);
//     bookId = response.body.book._id
//     expect(response.status).toBe(200);
//   });
//   test("get an author's book", async () => {
//     const response = await supertest(app)
//       .get(`/book/author/${authorId}`)
//       .set("Authorization", `Bearer ${token}`);
//       //console.log(response.body)
//       expect(response.status).toBe(200);
//   });
//   test("get a book", async () => {
//     const response = await supertest(app)
//       .get(`/book/${bookId}`)
//       .set("Authorization", `Bearer ${token}`);
//     //console.log(response.body.book.name);
//     expect(response.status).toBe(200);
//   });
//   test("update a book", async () => {
//     const response = await supertest(app)
//       .put(`/book/${bookId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         name: "Sunset",
//         isPublished: true,
//         datePublished: "2022-01-09",
//         serialNumber: "0002",
//       });
//     console.log(response.body);
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("successful");
//     expect(response.body.book.name).toMatch("Sunset");
//   });
//   test("delete a book", async () => {
//     const response = await supertest(app)
//       .delete(`/book/${bookId}`)
//       .set("Authorization", `Bearer ${token}`);
//     //   console.log(response.body)
//     expect(response.status).toBe(200);
//     expect(response.body.message).toBe("successfully deleted a book");
//   });
// });





// finished data

// describe('GET AUTHORS WITH TOKEN ', () => {
//     test('should return 200 status for all authors', async () => {
//         const res = await supertest(app).get('/author')
//         expect(res.statusCode).toEqual(200);
//     })
//     test('should return 200 status for a single author', async () => {
//         const res = (await supertest(app).get('/author/1'))
//         expect(res.statusCode).toEqual(200);
//     })
// })

// describe('GET AUTHORS WITHOUT TOKEN ', () => {
//     test('should return 403 status for all authors', async () => {
//         const res = await supertest(app).get('/author')
//         expect(res.statusCode).toEqual(403);
//     })
//     test('should return 403 status for a single author', async () => {
//         const res = (await supertest(app).get('/author/1'))
//         expect(res.statusCode).toEqual(403);
//     })
// })

// describe('POST AUTHOR', () => {
//     test('return status code 201 if author data is passed correctly ', async () => {
//         await supertest(app).post('/author').send(
//             {
//                 "author": "mary Dawn",
//                 "age": 28,
//                 "address": "5, Wall Street, Buckingham",
//             }
//         ).set('Accept', 'application/json')
//                 .expect('Content-Type', /json/)
//                 .expect(201)
//                 .expect(res => {
//                     res.body.data.length > 0
//                 })
//     })

//     test('should return bad request if some data is missing', async()=>{
//         const res = await supertest(app).post('/author').send({
//             author: "mary Dawn", //age is missing in the data below
//             address: "5, Wall Street, Buckingham",
//             books: [
//                 {
//                     "name": "Tomorrow is coming",
//                     "isPublished": true,
//                     "datePublished": 1637159508581,
//                     "serialNumber": 10
//                 },
//                 {
//                     "name": "Octobers very own",
//                     "isPublished": false,
//                     "datePublished": null,
//                     "serialNumber": null
//                 }
//             ]
//         })
//         // 400
//         expect(res.statusCode).toEqual(201)
//     })
// })
// describe('DELETE AN AUTHOR', ()=> {
//     test('it responds witha a message of Deleted', async ()=>{
//        const newAuthor = await supertest(app)
//        .post('/author')
//        .send( {
//         "author": "mary Dawn",
//         "age": 28,
//         "address": "5, Wall Street, Buckingham",
//         "books": [
//             {
//                 "name": "Tomorrow is coming",
//                 "isPublished": true,
//                 "datePublished": 1637159508581,
//                 "serialNumber": 10
//             },
//             {
//                 "name": "Octobers very own",
//                 "isPublished": false,
//                 "datePublished": null,
//                 "serialNumber": null
//             }
//         ]
//     })
//     const removedAuthor = await supertest(app).delete(`/author/${newAuthor.body.data.id}`);
//     expect(removedAuthor.body.message).toEqual(`Trashed!`)
//     })
// })
// describe('PUT AUTHOR', ()=>{
//     test('it responds with an updated data', async ()=> {
//         const newAuthor = await supertest(app)
//         .post('/author')
//         .send( {
//             "author": "Sammy",
//             "age": 25,
//             "address": "5, No 3 oilserve ",
//             "books": [
//                 {
//                     "name": "Tomorrow is coming",
//                     "isPublished": true,
//                     "datePublished": 1637159508581,
//                     "serialNumber": 10
//                 },
//                 {
//                     "name": "Octobers very own",
//                     "isPublished": false,
//                     "datePublished": null,
//                     "serialNumber": null
//                 }
//             ]
//         })
//         const updatedAuthor = await supertest(app)
//         .put(`/author/${newAuthor.body.data.id}`)
//         .send({author: "sylvester stallone"})
//         expect(updatedAuthor.body.data.author).toBe("sylvester stallone");
//         expect(updatedAuthor.body.data).toHaveProperty("id");
//         expect(updatedAuthor.statusCode).toBe(201)
//     })
// })

// describe('PUT AUTHOR WITHOUT TOKEN', ()=>{
//     test('it responds with a forbidden', async ()=> {
//         const newAuthor = await supertest(app)
//         .post('/author')
//         .send( {
//             "author": "Sammy",
//             "age": 25,
//             "address": "5, No 3 oilserve ",
//             "books": [
//                 {
//                     "name": "Tomorrow is coming",
//                     "isPublished": true,
//                     "datePublished": 1637159508581,
//                     "serialNumber": 10
//                 },
//                 {
//                     "name": "Octobers very own",
//                     "isPublished": false,
//                     "datePublished": null,
//                     "serialNumber": null
//                 }
//             ]
//         })
//         const updatedAuthor = await supertest(app)
//         .put(`/author/${newAuthor.body.data.id}`)
//         .send({author: "sylvester stallone"})
//         expect(updatedAuthor.body.data.author).toBe("sylvester stallone");
//         expect(updatedAuthor.body.data).toHaveProperty("id");
//         expect(updatedAuthor.statusCode).toBe(403)
//     })
// })

