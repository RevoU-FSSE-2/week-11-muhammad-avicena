const path = require("path");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");
const databaseMiddleware = require("./middleware/databaseMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const connectMongoDb = require("./db/db");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/user");
const formatMessage = require("./utils/message");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botName = "DeezChat Bot";

io.on("connection", (socket) => {
  console.log("Connected to socket");
  socket.on("joinRoom", ({ username, roomName }) => {
    const user = userJoin(socket.id, username, roomName);

    socket.join(user.roomName);

    // Welcome current user
    socket.emit(
      "message",
      formatMessage(botName, "Welcome to Deez-Chat App, Let's talk !")
    );

    // Broadcast when a user connects
    socket.broadcast
      .to(user.roomName)
      .emit(
        "welcomeMessage",
        formatMessage(botName, `${user.username} has joined the chat`)
      );

    // Send users and room info
    io.to(user.roomName).emit("roomUsers", {
      roomName: user.roomName,
      users: getRoomUsers(user.roomName),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomName).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.roomName).emit(
        "welcomeMessage",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.roomName).emit("roomUsers", {
        roomName: user.roomName,
        users: getRoomUsers(user.roomName),
      });
    }
  });
});
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(databaseMiddleware);

// Import router
const indexRouter = require("./routes/indexRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");

// Middleware

// Use router
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);

// Check connection to database
async function connectDatabase() {
  try {
    await connectMongoDb();
    console.log("Succesfully connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connectDatabase();

app.use(errorHandlerMiddleware);

// App listeners
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

module.exports = app;