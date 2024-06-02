import express from 'express';
import Controller from './Controllers/MemberController.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const opt = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Eigen API Documentation',
            version: '1.0.0',
            contact: {
                name: 'Rio Putra Pratama',
                email: 'riosraskaa@gmail.com',
                url: 'https://unix-waltz.github.io/'
            }
        },
    },
    apis: ['./src/*.js'], // Path to the API docs
};


const swaggerSpec = swaggerJSDoc(opt);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * /show/allbooks:
 *   get:
 *     summary: Retrieve a list of all available books
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The book ID.
 *                     example: 1
 *                   code:
 *                     type: string
 *                     description: The book code.
 *                     example: "B001"
 *                   title:
 *                     type: string
 *                     description: The title of the book.
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     description: The author of the book.
 *                     example: "F. Scott Fitzgerald"
 *                   status:
 *                     type: string
 *                     description: The status of the book.
 *                     example: "CANBEBORROWED"
 *                   stock:
 *                     type: integer
 *                     description: The number of copies available.
 *                     example: 3
 */
app.get('/show/allbooks', Controller.ShowAllBooks);

/**
 * @swagger
 * /show/allmembers:
 *   get:
 *     summary: Retrieve a list of all members
 *     responses:
 *       200:
 *         description: A list of members.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The member ID.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the member.
 *                     example: "John Doe"
 *                   code:
 *                     type: string
 *                     description: The member code.
 *                     example: "M001"
 *                   penalty:
 *                     type: string
 *                     description: The penalty status of the member.
 *                     example: "FALSE"
 *                   total_transaction:
 *                     type: integer
 *                     description: The number of books currently borrowed by the member.
 *                     example: 2
 */
app.get('/show/allmembers', Controller.ShowAllMember);

/**
 * @swagger
 * /borrow-book:
 *   post:
 *     summary: Borrow a book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 description: The ID of the user borrowing the book.
 *                 example: 1
 *               bookid:
 *                 type: integer
 *                 description: The ID of the book to borrow.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *       400:
 *         description: Unable to borrow book due to restrictions.
 *       404:
 *         description: User or book not found.
 */
app.post('/borrow-book', Controller.BorrowBooks);

/**
 * @swagger
 * /return-book:
 *   post:
 *     summary: Return a borrowed book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 description: The ID of the user returning the book.
 *                 example: 1
 *               bookid:
 *                 type: integer
 *                 description: The ID of the book to return.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *       400:
 *         description: Unable to return book due to restrictions.
 *       404:
 *         description: User or book not found.
 */
app.post('/return-book', Controller.ReturnBook);

const port = process.env.APP_LOCAL_PORT || 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
