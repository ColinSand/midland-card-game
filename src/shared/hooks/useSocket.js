import { useCallback, useContext, useRef, useState } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState([]);
  const { user, isHost } = useContext(UserContext);
  const { createDeck, startGameDeal, draw, leaveGame } =
    useContext(GameContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient("http://localhost:8080", {
      query: user,
    });
    socketRef.current.on("color", ({ color }) => {
      setColor(color);
    });
    socketRef.current.on("chat", (msg) => {
      setMessage((curr) => [...curr, msg]);
    });
    socketRef.current.on("join room", (room) => {
      (curr) => [...curr, room];
    });
    socketRef.current.on("leave game", () => {
      leaveGame();
    });
    socketRef.current.on("update deck", (deck) => {
      createDeck((curr) => [...curr, deck]);
    });
    socketRef.current.on("draw", () => {
      draw();
    });
    socketRef.current.on("start game deal", () => {
      startGameDeal();
    });
  }, []);

  const deck = useCallback(() => {
    socketRef.current.emit("deck", { deck });
  });
  const drawCard = useCallback(() => {
    socketRef.current.emit("draw", { drawCard });
  });

  const joinRoom = useCallback(() => {
    socketRef.current.emit("joinRoom", { user });
  }, []);

  const disconnect = useCallback((user) => {
    socketRef.current.emit("disconnect", { user });
  }, []);

  const sendChat = useCallback(
    (body, user) => {
      socketRef.current.emit("chat", { body, user, color });
    },
    [color]
  );
  return { message, sendChat, joinRoom, disconnect, deck };
};

export default useSocket;
