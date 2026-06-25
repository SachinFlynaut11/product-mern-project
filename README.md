# Product Hub (MERN Stack Application)

A premium, full-stack product catalog and management application built using the MERN stack (MongoDB, Express, React, Node.js). 

## 🚀 Features

- **JWT Authentication:** Secure user signup and signin, password hashing with `bcryptjs`, and session state management.
- **Product Operations:** Create, retrieve, update, and display product catalogs.
- **Local Image Uploads:** Seamless image uploads directly from your local storage to the server using `multer` with a drag-and-drop preview interface.
- **Interactive Wishlist:** Like/unlike products with real-time heartbeat sync using `react-icons` and instant wishlist aggregation.
- **Material UI Modals:** Modern modal workflows for adding new products directly from the navigation bar.
- **Premium Aesthetics:** Clean glassmorphic navbar styling, animated skeleton loaders, responsive grid design, and customized `react-hot-toast` notifications.

---

## 🛠️ Project Structure

```text
Product Mern project/
├── backend/
│   ├── config/             # Database connection setup
│   ├── controllers/        # Express handlers (auth, products)
│   ├── middleware/         # Auth protector & upload configuration
│   ├── models/             # Mongoose schemas (User, Product)
│   ├── routes/             # REST route bindings
│   ├── uploads/            # Local directory storing product images
│   ├── .env                # Secret keys and port configurations
│   └── server.js           # Server startup script
│
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios API config & fetch wrappers
│   │   ├── components/     # Navbar, Product Cards, Add Product Modal
│   │   ├── context/        # Global Auth State Profile Context
│   │   ├── pages/          # Home, Login, Signup, Liked Products, Profile, Edit
│   │   └── main.jsx        # App mounting entry point
│   ├── index.html
│   └── package.json
```

---

## 💻 Setup & Installation Instructions

### Prerequisites
- Install **Node.js** (v18+ recommended)
- Install **MongoDB** (local community server or MongoDB Atlas string)

### 1. Configure the Backend
Navigate to the `backend` folder:
```bash
cd backend
```

Create a `.env` file inside the `backend` folder and insert the following:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/product-mern
JWT_SECRET=your_jwt_secret_key_here
```

Install backend dependencies:
```bash
npm install
```

Start the backend development server (using `nodemon`):
```bash
npm start
```
*The backend server will run on `http://localhost:5000`*

---

### 2. Configure the Frontend
Navigate to the `frontend` folder:
```bash
cd ../frontend
```

Install frontend dependencies:
```bash
npm install
```

Start the frontend development server (using `Vite`):
```bash
npm run dev
```
*The frontend development server will launch on `http://localhost:5174` (or `http://localhost:5173`)*

---

## 📦 Installed Packages

### Backend
- `express` — Web framework for Node.js
- `mongoose` — MongoDB ODM
- `cors` — Cross-Origin Resource Sharing middleware
- `dotenv` — Environment variables configuration
- `bcryptjs` — Password hashing encryption
- `jsonwebtoken` — Secure JWT session tokens
- `multer` — Local disk image storage handler
- `nodemon` — Dev tool to auto-restart the node process

### Frontend
- `react-router-dom` — Single Page Application routing
- `axios` — HTTP request handler
- `tailwindcss` & `@tailwindcss/vite` — Utility-first styling framework (v4)
- `@mui/material` & `@emotion/react` & `@emotion/styled` — Material UI core components and modals
- `react-icons` — Icon pack collection (Fa, Md, Bi, etc.)
- `react-hot-toast` — Clean notifications toast system
