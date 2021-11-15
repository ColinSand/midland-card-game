const COLORS = require("../colors");

const socketConf = (io) => {
  io.on("connection", (socket) => {
    const { gameRoom } = socket.handshake.query;

    const randColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    socket.emit("userColor", { colors: randColor });

    socket.on("join room", ({ user }) => {
      socket.join(gameRoom);
      io.in(gameRoom).emit("chat", {
        msg: `${user} has joined the game`,
      });
    });
    socket.on("disconnect", ({ user }) => {
      socket.close(gameRoom);
      io.in(gameRoom).emit("chat", {
        msg: `${user} has left the game`,
      });
    });
    socket.on("update deck", ({ dealCards, isHost }) => {
      io.to(gameRoom).emit("update deck", { dealCards, isHost });
    });
    socket.on("chat", (msg) => {
      io.in(gameRoom).emit("chat", { msg });
    });
  });
};

module.exports = socketConf;
