import supertest from 'supertest'
import app from '../app'
// import { Users } from "../model/db";



let token: string;
let authorId: string;
let bookId: string;
let ID: string;



// async function deletedata() {
//     let result=await Users.deleteOne({email:loginData.email})
//     return result;
// }

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
        // //console.log(response.body);
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
    //console.log(response.body.message,ID, 'CHIIDFJDFDFJD')
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
    //   //console.log(response.body)
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
    //console.log('ffdfdfdfdfd',bookId);
    
    expect(response.status).toBe(201);
  });

  test("get a book", async () => {
    const response = await supertest(app)
      .get(`/author/books/${authorId}/${0}`)
      .set("Authorization", `Bearer ${token}`);
      //console.log(`/author/books/${authorId}/${bookId}/${0}`);
    ////console.log(response.body.book.name);
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
    //console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("updates a book");
    expect(response.body.data.name).toMatch("Sunset");
  })

  test("delete a book", async () => {
    const response = await supertest(app)
      .delete(`/author/book/${bookId}`)
      .set("Authorization", `Bearer ${token}`);
    //   //console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Book with the id ${bookId} has been trashed`);
  });
});




// deletedata() 


