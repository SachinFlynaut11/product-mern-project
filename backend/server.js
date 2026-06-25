import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On ${PORT}`
  );
});