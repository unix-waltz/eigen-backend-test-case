


# Eiden API

## Description

Eiden API is a library management system built with Express.js and Prisma. This API allows you to manage books and members, borrow and return books, and track the borrowing status of each book.

## Features

- Retrieve a list of all available books
- Retrieve a list of all members
- Borrow books
- Return books
- Penalty management for overdue books

## Prerequisites

- Node.js
- npm or yarn
- MySQL database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/unix-waltz/eigen-backend-test-case.git
   cd eiden-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables file:
   ```bash
   cp .copy.env .env
   ```

4. Update the `.env` file with your database credentials and other configuration.

## Database Setup

1. Initialize the Prisma client:
   ```bash
   npx prisma generate
   ```

2. Apply the Prisma migrations to your database:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Seed the database with initial data:
   ```bash
   npm run seeder
   ```

## Running the Server

Start the server:
```bash
npm start
```

The server will be running on `http://localhost:4000`.

## API Documentation

The API documentation is generated using Swagger. After starting the server, you can view the API documentation at `http://localhost:4000/api-docs`.

## Project Structure

```
├── src
│   ├── Controllers
│   │   └── MemberController.js
│   ├── Utility
│   │   └── Response.js
│   ├── prisma
│   │   ├── schema.prisma
│   └── app.js
├── .copy.env
├── .env
├── package.json
└── README.md
```

## Scripts

- `npm start`: Start the Express server
- `npm run seeder`: Run the seeder script to populate the database with initial data
- `npx prisma generate`: Generate the Prisma client
- `npx prisma migrate dev --name init`: Apply database migrations

## Technologies Used

- Express.js
- Prisma
- MySQL
- Swagger

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or questions, feel free to reach out:

- Name: RIO PUTRA PRATAMA
- Email: riosraskaa@gmail.com
- Website: [https://unix-waltz.github.io](https://unix-waltz.github.io)

