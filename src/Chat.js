import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message.js";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counter/userSlice";
import { selectChannelId, selectChannelName } from "./features/counter/appSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput ] = useState("");
    const [messages, setMessages ] = useState([]);
    const Messages = document.getElementById('Messages');

    useEffect(() => {
        if (channelId) {
            db.collection("channels")
                .doc(channelId)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("channels").doc(channelId).collection("messages")
        .add({
            message: input,
            user: user,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        })
        
        Messages.scrollTop = Messages.scrollHeight;
        setInput("");
    };

    return (
        <div className = "chat" >
            <ChatHeader channelName = {channelName} />

            <div 
                id = 'Messages' 
                className = "chat__messages" >
                {messages.map((message, id) => (
                    <Message 
                        key = {id}
                        message = {message.message}
                        user = {message.user}
                        timestamp = {message.timestamp}
                    />
                ))}
            </div>

            <div className = "chat__input">
                <AddCircleIcon fontSize = "large" />
                <form>
                    <input 
                        value = {input} 
                        disabled = {!channelId}
                        onChange = {(e) => setInput(e.target.value)} 
                        placeholder = {`Message #${channelName}`} />
                    <button 
                        disabled = {!channelId}
                        className = "chat__inputButton"
                        type = "submit"
                        onClick = {sendMessage}
                    >
                    </button>
                </form>

                <div className = "chat__inputIcons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon />
                </div>
            </div>

        </div>
    )
};

export default Chat;