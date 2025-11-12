import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
	openapi: "3.0.3",
	info: {
		title: "Bookstore API",
		version: "1.0.0",
		description:
			"REST API for managing authors, books, and authentication for the Bookstore project.",
		contact: {
			name: "Bookstore API Maintainers",
		},
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "Local development server",
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
		schemas: {
			AuthorInput: {
				type: "object",
				required: ["author", "age", "address"],
				properties: {
					author: { type: "string", example: "John Doe" },
					age: { type: "number", example: 32 },
					address: {
						type: "string",
						example: "7, Straight Street, Walls",
					},
					image: { type: "string", example: "https://..." },
				},
			},
			AuthorResponse: {
				type: "object",
				properties: {
					id: { type: "string", example: "author1" },
					author: { type: "string" },
					age: { type: "number" },
					address: { type: "string" },
					createdAt: { type: "string", format: "date-time" },
					updatedAt: { type: "string", format: "date-time" },
				},
			},
			BookInput: {
				type: "object",
				required: ["name", "isPublished", "serialNumber", "website"],
				properties: {
					name: { type: "string", example: "Tomorrow is Coming" },
					isPublished: { type: "boolean", example: true },
					serialNumber: { type: "number", example: 10 },
					website: {
						type: "string",
						format: "uri",
						example: "https://example.com/book",
					},
					image: { type: "string", example: "https://..." },
				},
			},
			BookResponse: {
				type: "object",
				properties: {
					id: { type: "string", example: "book1" },
					name: { type: "string" },
					isPublished: { type: "boolean" },
					serialNumber: { type: "string" },
					authorid: { type: "string" },
					createdAt: { type: "string", format: "date-time" },
					updatedAt: { type: "string", format: "date-time" },
				},
			},
			LoginInput: {
				type: "object",
				required: ["email", "password"],
				properties: {
					email: { type: "string", format: "email" },
					password: { type: "string", minLength: 4 },
				},
			},
			SignupInput: {
				type: "object",
				required: [
					"firstName",
					"lastName",
					"email",
					"password",
					"dateOfBirth",
					"phoneNumber",
				],
				properties: {
					firstName: { type: "string" },
					lastName: { type: "string" },
					email: { type: "string", format: "email" },
					password: { type: "string", minLength: 4 },
					dateOfBirth: { type: "string", format: "date" },
					phoneNumber: { type: "string" },
				},
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
	paths: {
		"/users/signup": {
			post: {
				tags: ["Users"],
				summary: "Create a new user account",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/SignupInput",
							},
						},
					},
				},
				responses: {
					201: {
						description: "Account created",
					},
					400: {
						description: "Validation error or account already exists",
					},
				},
			},
		},
		"/users/login": {
			post: {
				tags: ["Users"],
				summary: "Authenticate a user and receive a JWT",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/LoginInput",
							},
						},
					},
				},
				responses: {
					200: {
						description: "Login successful",
					},
					401: {
						description: "Invalid credentials",
					},
				},
			},
		},
		"/author/page/{pageno}": {
			get: {
				tags: ["Authors"],
				summary: "List authors with pagination",
				parameters: [
					{
						in: "path",
						name: "pageno",
						schema: { type: "integer", minimum: 1 },
						required: true,
						description: "Page number (1-based)",
					},
				],
				responses: {
					200: {
						description: "Paginated list of authors",
					},
				},
			},
		},
		"/author/id/{authorId}": {
			get: {
				tags: ["Authors"],
				summary: "Get a single author by id",
				parameters: [
					{
						in: "path",
						name: "authorId",
						schema: { type: "string" },
						required: true,
					},
				],
				responses: {
					200: {
						description: "Author found",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/AuthorResponse",
								},
							},
						},
					},
					404: { description: "Author not found" },
				},
			},
		},
		"/author": {
			post: {
				tags: ["Authors"],
				summary: "Create a new author",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/AuthorInput" },
						},
					},
				},
				responses: {
					201: { description: "Author created" },
					400: { description: "Validation error" },
				},
			},
		},
		"/author/{id}": {
			put: {
				tags: ["Authors"],
				summary: "Update an author",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "string" },
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/AuthorInput" },
						},
					},
				},
				responses: {
					201: { description: "Author updated" },
					400: { description: "Validation error" },
				},
			},
			delete: {
				tags: ["Authors"],
				summary: "Delete an author",
				parameters: [
					{
						in: "path",
						name: "id",
						required: true,
						schema: { type: "string" },
					},
				],
				responses: {
					201: { description: "Author deleted" },
				},
			},
		},
		"/author/{authorId}/book": {
			post: {
				tags: ["Books"],
				summary: "Create a book for an author",
				parameters: [
					{
						in: "path",
						name: "authorId",
						required: true,
						schema: { type: "string" },
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/BookInput" },
						},
					},
				},
				responses: {
					201: { description: "Book created" },
					400: { description: "Validation error" },
				},
			},
		},
		"/author/{authorId}/books/page/{pageno}": {
			get: {
				tags: ["Books"],
				summary: "List books for an author",
				parameters: [
					{
						in: "path",
						name: "authorId",
						required: true,
						schema: { type: "string" },
					},
					{
						in: "path",
						name: "pageno",
						required: true,
						schema: { type: "integer", minimum: 1 },
					},
				],
				responses: {
					200: { description: "Paginated list of books" },
				},
			},
		},
		"/author/book/{bookId}": {
			put: {
				tags: ["Books"],
				summary: "Update a book",
				parameters: [
					{
						in: "path",
						name: "bookId",
						required: true,
						schema: { type: "string" },
					},
				],
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: { $ref: "#/components/schemas/BookInput" },
						},
					},
				},
				responses: {
					201: { description: "Book updated" },
					400: { description: "Validation error" },
				},
			},
			delete: {
				tags: ["Books"],
				summary: "Delete a book",
				parameters: [
					{
						in: "path",
						name: "bookId",
						required: true,
						schema: { type: "string" },
					},
				],
				responses: {
					200: { description: "Book deleted" },
				},
			},
		},
	},
};

const options = {
	definition: swaggerDefinition,
	apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
