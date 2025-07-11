# Library Management System Backend

This is the backend for the Library Management System, built with Node.js, Express, and MongoDB (Mongoose). It provides RESTful APIs for authentication, books, members, loans, and reservations, with role-based access control.

---

## 📁 Project Structure

```
frappe-backend/
├── config/
│   └── db.js                # MongoDB connection
├── controllers/
│   ├── authController.js    # Auth logic (register, login)
│   ├── bookController.js    # Book CRUD logic
│   ├── memberController.js  # Member CRUD logic
│   ├── loanController.js    # Loan CRUD logic
│   └── reservationController.js # Reservation CRUD logic
├── middleware/
│   ├── authMiddleware.js    # JWT authentication
│   └── roleMiddleware.js    # Role-based access
├── models/
│   ├── User.js
│   ├── Book.js
│   ├── Member.js
│   ├── Loan.js
│   └── Reservation.js
├── routes/
│   ├── auth.js
│   ├── books.js
│   ├── members.js
│   ├── loans.js
│   └── reservations.js
├── server.js                # Express app entry point
├── package.json
└── .env                     # Environment variables (create manually)
```

---

## 🚀 Getting Started

### 1. Clone the repository and install dependencies
```bash
cd frappe-backend
npm install
```

### 2. Create a `.env` file in the root
```
MONGO_URI=mongodb://localhost:27017/librarydb
PORT=5000
JWT_SECRET=your_jwt_secret_here
```

### 3. Start MongoDB
Make sure MongoDB is running locally or update `MONGO_URI` for your setup.

### 4. Start the server
```bash
npm start
```
The server will run on `http://localhost:5000` by default.

---

## 🛠️ Implementation Overview

- **Database:** MongoDB with Mongoose models for User, Book, Member, Loan, Reservation.
- **Authentication:** JWT-based, with role support (admin, librarian, member).
- **Controllers:** Handle business logic for each resource.
- **Routes:** RESTful endpoints for CRUD and auth.
- **Middleware:**
  - `authMiddleware.js`: Verifies JWT tokens.
  - `roleMiddleware.js`: Restricts access by user role.
- **Environment:** Configured via `.env`.

---

## 📚 API Endpoints (Sample)

- **Auth:**
  - `POST /api/auth/register` — Register new user
  - `POST /api/auth/login` — Login and get JWT
- **Books:**
  - `GET /api/books` — List all books
  - `POST /api/books` — Add a new book
  - `PUT /api/books/:id` — Update a book
  - `DELETE /api/books/:id` — Delete a book
- **Members, Loans, Reservations:** Similar CRUD endpoints

> **Note:** Most endpoints require authentication and proper role.

---

## 🧪 Testing
- Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test endpoints.
- Register/login to get a JWT, then include it in the `Authorization: Bearer <token>` header for protected routes.

---

## 📝 Tips & Extras
- Use [nodemon](https://nodemon.io/) for auto-reloading during development.
- Add input validation with [express-validator](https://express-validator.github.io/).
- Add logging with [morgan](https://www.npmjs.com/package/morgan).
- Extend controllers and middleware for full functionality.

---

## 📦 Dependencies
- express
- mongoose
- cors
- dotenv
- body-parser
- jsonwebtoken
- bcryptjs

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License
MIT 