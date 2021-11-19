import React, { useContext, useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../../../shared/context/UserContext";
import CodeIcon from "@mui/icons-material/Code";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import "./Chat.css";
const developers = ["nate", "seth", "colin", "mike"];

function Chat({ host, message, sendChat }) {
  const { user } = useContext(UserContext);
  const [body, setBody] = useState("");

  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className="message-location">
      <header className="chat-header">Chat</header>
      <div className="message-display">
        {message &&
          message.map((m, idx) => (
            <div className="message" key={idx}>
              <span style={{ color: m.color }}>
                {m.user === host && (
                  <ManageAccountsIcon sx={{ verticalAlign: "middle" }} />
                )}{" "}
                {developers.includes(m.user.toLowerCase()) && (
                  <CodeIcon sx={{ verticalAlign: "middle" }} />
                )}{" "}
                {m.user}
              </span>
              - {m.body}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>
      <div className="submit">
        <input
          className="input-bar"
          id="chat"
          value={body}
          placeholder="Send Message"
          onChange={(e) => setBody(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              if (body.length <= 0) {
                return;
              }
              sendChat(body, user.username);
              setBody("");
            }
          }}
        />
        <Button
          className="send-btn"
          sx={{
            bgcolor: "#1f2f53",
            "&:hover": {
              background: "#1f2f53ab",
            },
          }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
            if (body.length <= 0) {
              return;
            }
            sendChat(body, user.username);
            setBody("");
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
