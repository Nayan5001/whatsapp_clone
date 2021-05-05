import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import db from "./Firebase.jsx";
import { Link } from "react-router-dom";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
function Sidebar_chat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter the name for chat room");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <IconButton>
          {/* Backquotes used */}
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>
        <div className="sidebar_chatinfo">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}
export default Sidebar_chat;
