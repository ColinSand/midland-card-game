import { useCallback, useContext, useRef, useState } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState([]);
  const { user, isHost } = useContext(UserContext);
  const { leaveGame } = useContext(GameContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient("http://localhost:8080", {
      query: { user, gameRoom: room },
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
    socketRef.current.on("update deck", ({ deck, players }) => {
      setDeck(deck);
      setPlayers(players);
    });
    socketRef.current.on("host", () => {
      setIsHost(isHost);
    });
  }, []);

  const host = useCallback(() => {
    socketRef.current.emit("host", { host });
  });

  const deck = useCallback(() => {
    socketRef.current.emit("deck", { deck, players });
  });

  const sendChat = useCallback(
    (body, user) => {
      socketRef.current.emit("chat", { body, user, color });
    },
    [color]
  );
  return { message, sendChat, deck };
};

export default useSocket;
