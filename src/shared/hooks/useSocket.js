import { useCallback, useContext, useRef, useState, useEffect } from "react";
import socketIoClient from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { GameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
const useSocket = (room) => {
  const [color, setColor] = useState(null);
  const [message, setMessage] = useState([]);

  const { user, isHost } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    leaveGame,
    setDeck,
    draw,
    createDeck,
    setIsTurn,
    setPlayers,
    isTurn,
    host,
    setHost,
  } = useContext(GameContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIoClient(
      "https://midland-card-game.herokuapp.com",
      {
        query: { user: user.username, gameRoom: room, isHost },
      }
    );
    socketRef.current.on("color", ({ color }) => {
      setColor(color);
    });
    socketRef.current.on("chat", (msg) => {
      setMessage((curr) => [...curr, msg]);
    });
    socketRef.current.on("join game", ({ user }) => {
      if (isHost) {
        setPlayers((curr) => {
          let newPlayers = [...curr, { username: user, deck: [] }];
          socketRef.current.emit("update players", {
            players: newPlayers,
            host,
          });
          return newPlayers;
        });
      }
    });
    socketRef.current.on("update players", ({ players, host }) => {
      setPlayers(players);
      setHost(host);
    });

    socketRef.current.on("player leave", ({ players, isTurn }) => {
      setPlayers(players);
      setIsTurn(isTurn);
    });

    socketRef.current.on("leave game", ({ user }) => {
      if (isHost) {
        setPlayers((curr) => {
          let i = curr.findIndex((u) => u.username === user);
          let newIsTurn;
          const newPlayersArray = curr.filter(
            (player) => user !== player.username
          );
          setIsTurn((currIsTurn) => {
            newIsTurn = currIsTurn;
            if (i <= isTurn && isTurn !== null) {
              newIsTurn--;
            }
            if (newIsTurn >= newPlayersArray.length) {
              newIsTurn = null;
            }
            socketRef.current.emit("player leave", {
              players: newPlayersArray,
              isTurn: newIsTurn,
            });
            return newIsTurn;
          });

          return newPlayersArray;
        });
      }
      leaveGame(user);
    });
    socketRef.current.on("update deck", ({ deck, players, isTurn }) => {
      setDeck(deck);
      setPlayers(players);
      setIsTurn(isTurn);
    });

    socketRef.current.on("close room", () => {
      navigate("/home");
    });

    return () => socketRef.current.disconnect();
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
