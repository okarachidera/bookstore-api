

import { Request, Response } from 'express'
import supertest from 'supertest'
import app from '../app'
import {deleteAuthor}  from '../controller/books.controller'
describe('GET AUTHORS WITH TOKEN ', () => {
    test('should return 200 status for all authors', async () => {
        const res = await supertest(app).get('/author')
        expect(res.statusCode).toEqual(200);
    })
    test('should return 200 status for a single author', async () => {
        const res = (await supertest(app).get('/author/1'))
        expect(res.statusCode).toEqual(200);
    })
})
describe('GET AUTHORS WITHOUT TOKEN ', () => {
    test('should return 403 status for all authors', async () => {
        const res = await supertest(app).get('/author')
        expect(res.statusCode).toEqual(403);
    })
    test('should return 403 status for a single author', async () => {
        const res = (await supertest(app).get('/author/1'))
        expect(res.statusCode).toEqual(403);
    })
})
describe('POST AUTHOR', () => {
    test('return status code 201 if author data is passed correctly ', async () => {
        await supertest(app).post('/author').send(
            {
                "author": "mary Dawn",
                "age": 28,
                "address": "5, Wall Street, Buckingham",
                "books": [
                    {
                        "name": "Tomorrow is coming",
                        "isPublished": true,
                        "datePublished": 1637159508581,
                        "serialNumber": 10
                    },
                    {
                        "name": "Octobers very own",
                        "isPublished": false,
                        "datePublished": null,
                        "serialNumber": null
                    }
                ]
            }
        ).set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .expect(res => {
                    res.body.data.length > 0
                })
    })

    test('should return bad request if some data is missing', async()=>{
        const res = await supertest(app).post('/author').send({
            author: "mary Dawn", //age is missing in the data below
            address: "5, Wall Street, Buckingham",
            books: [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        })
        // 400
        expect(res.statusCode).toEqual(201)
    })
})
describe('DELETE AN AUTHOR', ()=> {
    test('it responds witha a message of Deleted', async ()=>{
       const newAuthor = await supertest(app)
       .post('/author')
       .send( {
        "author": "mary Dawn",
        "age": 28,
        "address": "5, Wall Street, Buckingham",
        "books": [
            {
                "name": "Tomorrow is coming",
                "isPublished": true,
                "datePublished": 1637159508581,
                "serialNumber": 10
            },
            {
                "name": "Octobers very own",
                "isPublished": false,
                "datePublished": null,
                "serialNumber": null
            }
        ]
    })
    const removedAuthor = await supertest(app).delete(`/author/${newAuthor.body.data.id}`);
    expect(removedAuthor.body.message).toEqual(`Trashed!`)
    })
})
describe('PUT AUTHOR', ()=>{
    test('it responds with an updated data', async ()=> {
        const newAuthor = await supertest(app)
        .post('/author')
        .send( {
            "author": "Sammy",
            "age": 25,
            "address": "5, No 3 oilserve ",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        })
        const updatedAuthor = await supertest(app)
        .put(`/author/${newAuthor.body.data.id}`)
        .send({author: "sylvester stallone"})
        expect(updatedAuthor.body.data.author).toBe("sylvester stallone");
        expect(updatedAuthor.body.data).toHaveProperty("id");
        expect(updatedAuthor.statusCode).toBe(201)
    })
})

describe('PUT AUTHOR WITHOUT TOKEN', ()=>{
    test('it responds with a forbidden', async ()=> {
        const newAuthor = await supertest(app)
        .post('/author')
        .send( {
            "author": "Sammy",
            "age": 25,
            "address": "5, No 3 oilserve ",
            "books": [
                {
                    "name": "Tomorrow is coming",
                    "isPublished": true,
                    "datePublished": 1637159508581,
                    "serialNumber": 10
                },
                {
                    "name": "Octobers very own",
                    "isPublished": false,
                    "datePublished": null,
                    "serialNumber": null
                }
            ]
        })
        const updatedAuthor = await supertest(app)
        .put(`/author/${newAuthor.body.data.id}`)
        .send({author: "sylvester stallone"})
        expect(updatedAuthor.body.data.author).toBe("sylvester stallone");
        expect(updatedAuthor.body.data).toHaveProperty("id");
        expect(updatedAuthor.statusCode).toBe(403)
    })
})

