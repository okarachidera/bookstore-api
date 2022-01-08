import fs from 'fs';
import path from 'path';
import Joi from 'joi';

export interface books{
    id?: string,
    name: string,
    isPublished: Boolean,
    datePublished: Date | null,
    serialNumber: number | null
}
export interface author{
    id?: number,
    author: string,
    dateRegistered: Date,
    age: number,
    address: string,
    books: books[]
}

const filePath = path.join(__dirname, '../../database.json');

export const readFile = () => {
    try {
      const data = fs.readFileSync(filePath, {encoding:'utf-8'});
      return JSON.parse(data);
    } catch (e) {
        return []
    }
}

export function generateIdsForBooks (booksData: books[]): books[] {
    return booksData.map((book: books, idx) => {
        return {id: `book${idx + 1}`, ...book }
    })
}

export const validateEntry = (data: author) =>{
    const schema = Joi.object({
        author: Joi.string(),
        age: Joi.number(),
        address: Joi.string(),
        books: Joi.array()
    }).unknown();
    return schema.validate(data);
}

export const writeFile = (data: author[]) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 3));
}
