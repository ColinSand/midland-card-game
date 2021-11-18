const COLORS = require("../colors");

const socketConf = (io) => {
  io.on("connection", (socket) => {
    const { gameRoom, user } = socket.handshake.query;

    const randColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    socket.emit("color", { color: randColor });
    socket.join(gameRoom);
    io.to(gameRoom).emit("join game", { user });
    io.to(gameRoom).emit("chat", {
      user: "DEALER",
      body: `${user} has joined the game`,
      color: "black",
    });

    socket.on("disconnect", () => {
      io.to(gameRoom).emit("chat", {
        msg: `${user} has left the game`,
        color: randColor,
      });
      io.to(gameRoom).emit("leave game", { user });
    });
    socket.on("update deck", ({ deck, players, isTurn }) => {
      io.to(gameRoom).emit("update deck", { deck, players, isTurn });
    });
    socket.on("chat", (msg) => {
      io.to(gameRoom).emit("chat", {
        user: msg.user,
        color: msg.color,
        body: msg.body,
      });
    });
  });
};

module.exports = socketConf;
