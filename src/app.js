import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import { FRONTEND_URL } from "./config.js";

dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true, // Permitir enviar cookies
// }));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(authRoutes);
// log function for auth routes

app.use("/api/auth", authRoutes);
app.use("/api", productoRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;
