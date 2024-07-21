import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import { app, server } from "./socket/socket.js";


const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //middleware to parse json data (from req.body)
app.use(cookieParser()); //middleware to parse cookies



app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});



server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
