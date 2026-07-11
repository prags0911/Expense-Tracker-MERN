import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./user/user.routes.js";
import expenseRouter from "./expense/expense.routes.js";
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Request Logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});
// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "Setup Success",
  });
});

// SMTP Diagnostic Route (temporary - remove after testing)
app.get("/test-smtp", async (req, res) => {
  const net = await import("net");
  const socket = new net.Socket();
  socket.setTimeout(5000);
  socket.on("connect", () => {
    res.send("SMTP port reachable!");
    socket.destroy();
  });
  socket.on("timeout", () => {
    res.send("SMTP port blocked (timeout)");
    socket.destroy();
  });
  socket.on("error", (err) => {
    res.send("SMTP port blocked: " + err.message);
  });
  socket.connect(465, "smtp.gmail.com");
});

// Database Connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected !"))
  .catch((err) => console.log("Database not connected !", err));
// Routes
app.use("/api/user", userRouter);
app.use("/api/expense", expenseRouter);
// Global Error Handler (Keep this LAST)
app.use((err, req, res, next) => {
  console.error("--- GLOBAL ERROR CAUGHT ---");
  console.error(err.stack);
  console.error("----------------------------");
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
// Server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
