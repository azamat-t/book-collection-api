# Book Collection RESTful API

## Description

This is a RESTful API for managing a collection of books. The API allows users to add books, view the list of books, update information about books, and delete books. Additionally, it provides functionality for user registration, authentication, role-based access control using bitmasks, and more.

## Features

- **User Management**:
  - Register users with email confirmation.
  - Authenticate users using JWT.
  - Fetch current user details.
  - Role-based access control using bitmasks.
- **Book Management**:
  - Add, view, update, and delete books.
  - Get book details by ID.

## Technologies Used

- **Node.js** with **TypeScript**
- **Express.js** - Web framework for Node.js
- **PostgreSQL** - Database management system
- **Prisma** - ORM (Object-Relational Mapping)
- **JWT** - Authentication
- **Docker** - Containerization

## Requirements

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **PostgreSQL** (v12 or higher)
- **Docker** (optional, for containerization)
- **Prisma CLI**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-api.git
cd book-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
JWT_SECRET=your_jwt_secret
PORT=3000
```

### 4. Set Up PostgreSQL Database

Ensure PostgreSQL is running and create a new database (e.g., `mydb`).

```sql
CREATE DATABASE mydb;
```

### 5. Set Up Prisma

Run the following commands to set up Prisma and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 6. Run the Application

#### Option 1: Running Locally

```bash
npm run dev
```

#### Option 2: Running with Docker

If you prefer to use Docker, make sure Docker is installed, and then run:

```bash
docker-compose up --build
```

## API Documentation

### User Management Endpoints

#### 1. User Registration

- **Method**: `POST`
- **Endpoint**: `/users/register`
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword",
    "email": "johndoe@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": 0
  }
  ```

#### 2. User Login

- **Method**: `POST`
- **Endpoint**: `/users/login`
- **Request Body**:
  ```json
  {
    "username": "johndoe",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### 3. Get Current User

- **Method**: `GET`
- **Endpoint**: `/users/me`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": 0
  }
  ```

#### 4. Change User Role

- **Method**: `PUT`
- **Endpoint**: `/users/:id/role`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Request Body**:
  ```json
  {
    "role": 1
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "role": 1
  }
  ```

### Book Management Endpoints

#### 1. Add a Book

- **Method**: `POST`
- **Endpoint**: `/books`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Request Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationDate": "1925-04-10T00:00:00.000Z",
    "genres": ["Classic", "Novel"]
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationDate": "1925-04-10T00:00:00.000Z",
    "genres": ["Classic", "Novel"]
  }
  ```

#### 2. Get All Books

- **Method**: `GET`
- **Endpoint**: `/books`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publicationDate": "1925-04-10T00:00:00.000Z",
      "genres": ["Classic", "Novel"]
    }
  ]
  ```

#### 3. Get a Book by ID

- **Method**: `GET`
- **Endpoint**: `/books/:id`
- **Response**:
  ```json
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationDate": "1925-04-10T00:00:00.000Z",
    "genres": ["Classic", "Novel"]
  }
  ```

#### 4. Update a Book

- **Method**: `PUT`
- **Endpoint**: `/books/:id`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Request Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationDate": "1925-04-10T00:00:00.000Z",
    "genres": ["Classic", "Novel"]
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationDate": "1925-04-10T00:00:00.000Z",
    "genres": ["Classic", "Novel"]
  }
  ```

#### 5. Delete a Book

- **Method**: `DELETE`
- **Endpoint**: `/books/:id`
- **Headers**:
  - `Authorization: Bearer <admin_token>`
- **Response**:
  ```json
  {
    "message": "Book deleted"
  }
  ```

## Testing

You can use tools like Postman, Insomnia, or curl to test the API endpoints.

## Notes

- Replace `your_jwt_secret` with a secure, unique secret key.
- For production environments, ensure to use environment variables and secure configurations.
- Consider setting up logging, monitoring, and further security measures for a production-ready API.

## License

This project is licensed under the MIT License.

---

Let me know if you need any adjustments or further details!
