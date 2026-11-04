# 🛍️ MyStore — Full-Stack MERN E-Commerce

<p align="center">
  <strong>A modern full-stack e-commerce application built with the MERN stack.</strong>
  <br />
  Browse products, manage your cart, place orders, and manage your store through an admin dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## ✨ Overview

**MyStore** is a full-stack e-commerce web application developed using MongoDB, Express.js, React, and Node.js.

It provides a complete shopping experience with user authentication, product browsing, cart management, checkout, order tracking, and administrative controls.

The application uses a REST API architecture and MongoDB for persistent data storage.

## 🚀 Features

### 🛒 Customer Features
- User registration and login
- Secure cookie-based authentication
- Browse and explore products
- View individual product details
- Add products to cart
- Increase or decrease cart quantities
- Remove products from cart
- Persistent cart data
- Checkout and order placement
- View order history
- Manage user profile

### 🔐 Admin Features
- Admin dashboard
- Add new products
- Update existing products
- Delete products
- Manage customer orders
- Update order statuses
- View registered users
- Dashboard statistics

### ⚙️ Technical Features
- RESTful API architecture
- MongoDB database integration
- JWT authentication with HTTP-only cookies
- Protected routes
- Centralized API utility
- React Context API for state management
- Responsive user interface
- Backend validation and error handling

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend |
| Vite | Development and build tool |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| Cookie Parser | Cookie handling |

## 📁 Project Structure

```text
MyStore/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

*Folder structure is representative; adjust names if your actual project differs.*

## ⚡ Getting Started

### 1. Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas account
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/tejendrathakur061/myStore-ecommerce.git
```

```bash
cd 
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
PORT=7777
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

Start the backend:

```bash
npm run dev
```

### 4. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL shown by Vite, usually:

```text
http://localhost:5173
```

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used for JWT signing |

**Security:** Never upload `.env` files, database credentials, JWT secrets, or private keys to GitHub.

## 🔌 API Overview

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Get all products |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |
| POST | `/auth/register` | Register user |
| POST | `/auth/login` | Login user |
| POST | `/auth/logout` | Logout user |
| GET | `/auth/profile` | Get user profile |
| GET | `/cart` | Get user cart |
| POST | `/cart/add` | Add product to cart |
| PUT | `/cart/:productId` | Update cart quantity |
| DELETE | `/cart/:productId` | Remove cart item |
| POST | `/orders` | Place order |
| GET | `/orders` | Get user orders |
| GET | `/orders/admin/all` | Get all orders |

*Protected endpoints require authentication. Admin endpoints require admin authorization.*

## 🔒 Authentication

MyStore uses JWT-based authentication with HTTP-only cookies.

- Login creates an authentication cookie.
- Protected routes verify the authenticated user.
- Admin routes enforce role-based access.
- Logout clears the authentication cookie.


## 🛠️ Future Improvements

- Online payment gateway integration
- Product reviews and ratings
- Product search and filtering
- Wishlist functionality
- Order tracking enhancements
- Product image upload
- Deployment and production optimization

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

## 📄 License

This project is available under the MIT License.

---

<p align="center">
  Built with ❤️ using the MERN Stack
  <br />
  <strong>MyStore — Your Shopping Experience, Simplified.</strong>
</p>
