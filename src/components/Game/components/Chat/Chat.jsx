import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { UserContext } from "../../../../shared/context/UserContext";

import "./Chat.css";

function Chat({ message, sendChat }) {
  const { user } = useContext(UserContext);
  const [body, setBody] = useState("");

  return (
    <div>
      <div className="message-display">
        {message &&
          message.map((m, idx) => (
            <div key={idx}>
              <span style={{ color: m.color }}>{m.username} </span> - {m.body}
            </div>
          ))}
      </div>
      <div className="message-location">
        <header className="chat-header">Chat</header>
        <input
          className="input-bar"
          id="chat"
          value={body}
          placeholder="Send Message"
          onChange={(e) => setBody(e.target.value)}
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              sendChat(body, user.username);
              setBody("");
            }
          }}
        />
        <Button
          className="send-btn"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => {
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
