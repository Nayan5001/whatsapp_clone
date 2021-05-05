import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Sidebarchat from "./Sidebar_chat.jsx";
import db from "./Firebase.jsx";
import { useStateValue } from "./StateProvider.jsx";
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
          <Avatar src={user?.photoURL} />
        </IconButton>
        <div className="sidebar_header_right">
         <WhatsAppIcon/>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_search_container">
          <IconButton>
            <SearchIcon />
          </IconButton>

          <input type="text" placeholder="Search Or Start New Chat" />
        </div>
      </div>
      <div className="sidebar_chat">
        <Sidebarchat addNewChat />
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
