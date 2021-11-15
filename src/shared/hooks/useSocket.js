import { useCallback, useContext, useRef, useState } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";

const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState([]);
  const { user } = useContext(UserContext);

  const socketRef = useRef();

  const [data, setData] = useState({
    drawDeck: [],
    players: [],
    activeGame: false,
  });

  useEffect(() => {
    socketRef.current = socketIoClient("http://localhost:8080");
    socketRef.current.on("color", ({ color }) => {
      setColor(color);
    });
    socketRef.current.on("chat", (msg) => {
      setMessage((curr) => [...curr, msg]);
    });
    socketRef.current.on("join room", (room) => {
      setData((curr) => [...curr, room]);
    });
    socketRef.current.on("update deck", () => {});
  }, []);

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
  return { message, sendChat, joinRoom, disconnect };
};

export default useSocket;
