const io = require("socket.io")(8800, {
  cors: {
    origin: "*",
  },
});

let activeUsers = [];

io.on("connection", (socket) => {
  // add new user
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("Connected Users", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    // setting logic for single user
    const user = activeUsers.find((user) => user.userId === data.receiverId);
    if (user) {
      io.to(user.socketId).emit("receive-message", data?.newMessage);
      console.log("=========================");
      console.warn("rec id", data.receiverId);
      console.log("new message", data.newMessage);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId != socket.id);
    console.log("User Disconnected", activeUsers);
    io.emit("get-users", activeUsers);
  });
});
