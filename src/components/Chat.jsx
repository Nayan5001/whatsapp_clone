import React, { useState, useEffect,useRef } from "react";
import { Avatar } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import { useParams,useHistory } from "react-router-dom";
import db from "./Firebase.jsx";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import SpeechRecognition,{useSpeechRecognition} from "react-speech-recognition";
import Message from "./Message.jsx";
import UserCard from "./UserCard.jsx";
import axios from 'axios';
 
import Picker from 'emoji-picker-react';
function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const history=useHistory();
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  // const admin = require('firebase-admin');

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (event) => {
    event.preventDefault();
    stopHandle();
    console.log("You typed>>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input||transcript,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput("");
    resetTranscript("");
  };
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    prompt(" Browser is not Support Speech Recognition.");
  }
  const handleListing = () => {
    setIsListening(true);
    <Message/>
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  const addFile=()=>{
   prompt("Hello");
  }
  

    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);
     const EmojiClicked=()=>{
      <Picker onEmojiClick={onEmojiClick}/>
     }
  return (
    <div className="Chat">
      <div className="chat_header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toString().substr(0,25)}
            )
          </p>
        </div>
        <div className="chat_headerRight">
          
        </div>
      </div>
      <div className="chat_body">
      
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toString().substr(0,25)}
            </span>
          </p>
        ))}

        {/* Backquotes used */}
        <div ref={messagesEndRef}/>
      </div>
      <div className="chat_footer">
        <IconButton>
          <EmojiEmotionsIcon onClick={EmojiClicked} />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input||transcript}
            onChange={(e) => {setInput(e.target.value)
            resetTranscript(e.target.value)}}
          />
          <button type="submit" onClick={sendMessage}>
            <SendIcon />
          </button>
        </form>
        <IconButton>
          <MicIcon  ref={microphoneRef}
          onClick={handleListing}/>
           
       
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
