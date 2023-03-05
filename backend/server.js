const express = require("express");
const { connectDB } = require("./utils/db.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { dummy_chats } = require("./dummy_data/data.js");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");
const cors = require("cors");

require("colors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    // origin: "https://chat-app-frontend-cyan.vercel.app/",
    origin: "*",
  })
);

app.use(express.json()); // to accept json data
app.use((req, res, next) => {
  console.log(`${req.path}   ${req.method}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/dummy_chats", (req, res) => {
  res.send(dummy_chats);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// error handlers
app.use(notFound);
// notice how notFound is above, because we want to access it
// first before errorHandler
app.use(errorHandler);

connectDB();
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.yellow.bold);
});
