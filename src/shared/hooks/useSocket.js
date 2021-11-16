import { useCallback, useContext, useRef, useState } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState("");

  const { user, isHost } = useContext(UserContext);
  const { leaveGame, setDeck, draw, createDeck, setIsTurn, setPlayers } =
    useContext(GameContext);

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
    socketRef.current.on("join room", ({ user }) => {
      let newPlayersArray = [...players, user];
      setPlayers(newPlayersArray);
    });
    socketRef.current.on("leave game", ({ user }) => {
      leaveGame(user);
    });
    socketRef.current.on("update deck", ({ deck, players, isTurn }) => {
      setDeck(deck);
      setPlayers(players);
      setIsTurn(isTurn);
    });
  }, []);

  const updatedDeck = useCallback(() => {
    createDeck();
    socketRef.current.emit("update deck", { players, deck, isTurn });
    return updatedDeck(createDeck);
  });

  const drawCards = useCallback((playerIdx, keptCards) => {
    draw(playerIdx, keptCards);
    socketRef.current.emit("draw", { players, deck, isTurn });
  });

  const sendChat = useCallback(
    (body, user) => {
      socketRef.current.emit("chat", { body, user, color });
    },
    [color]
  );
  return { message, sendChat, drawCards, updatedDeck };
};

export default useSocket;

// For draw take value of function
// Join game needs on but not emit
// Leave game needs on and emit
// Update deck needs on and emit
//
