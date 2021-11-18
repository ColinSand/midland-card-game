import { useCallback, useContext, useRef, useState, useEffect } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";

const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState([]);

  const { user } = useContext(UserContext);
  const {
    leaveGame,
    setDeck,
    draw,
    createDeck,
    setIsTurn,
    setPlayers,
    players,
  } = useContext(GameContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient("http://localhost:8080", {
      query: { user: user.username, gameRoom: room },
    });
    socketRef.current.on("color", ({ color }) => {
      setColor(color);
    });
    socketRef.current.on("chat", (msg) => {
      setMessage((curr) => [...curr, msg]);
    });
    socketRef.current.on("join game", ({ user }) => {
      let newPlayersArray = [...players, { username: user, deck: [] }];
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

  const startGame = useCallback(() => {
    let updatedDeck = createDeck();
    socketRef.current.emit("update deck", updatedDeck);
  }, [createDeck]);

  const drawCards = useCallback(
    (playerIdx, keptCards) => {
      let updatedDeck = draw(playerIdx, keptCards);
      socketRef.current.emit("update deck", updatedDeck);
    },
    [draw]
  );

  const sendChat = useCallback(
    (body, user) => {
      socketRef.current.emit("chat", { body, user, color });
    },
    [color]
  );
  return { message, sendChat, drawCards, startGame };
};

export default useSocket;
