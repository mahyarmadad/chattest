const express = require("express");
const socket = require("socket.io");
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./user");
const app = express();
const port = process.env.PORT || 5000;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000 ",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user Connected :>>");

  socket.on("join", ({ state }, callback) => {
    const { name, room } = state;
    const { user, error } = addUser(socket.id, name, room);
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} , Welcome to the ${user.room}`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} , Has joined` });
    socket.join(user.room);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.use(router);
server.listen(port, () => console.log(`Server is Running on : ${port}`));
