const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./user");
const formatMessage = require("./message");

function configureSocket(io) {
  io.on("connection", (socket) => {
    const botName = "DeezChat Bot";

    console.log("Connected to socket");
    socket.on("joinRoom", ({ username, roomName }) => {
      const user = userJoin(socket.id, username, roomName);

      socket.join(user.roomName);

      // Welcome current user
      socket.emit(
        "message",
        formatMessage(botName, "Welcome to DeezChat App, Let's talk !")
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
}

module.exports = configureSocket;
