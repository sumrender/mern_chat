import { useEffect, useRef, useState } from "react";
import useChatContext from "../hooks/useChatContext";
import useRootContext from "../hooks/useRootContext";

const styles = {
  chatBox: {
    backgroundColor: "green",
    width: "70vh",
  },
  chats: {
    height: "90%",
    overflowY: "scroll",
  },
  message: {},
};

export default function ChatBox({ setSocketMessage, receiveMessage }) {
  const [input, setInput] = useState("");
  const { user } = useRootContext();
  const { messages, setMessages, sendMessage, selectedChat, chatNames } =
    useChatContext();

  const scroll = useRef();

  useEffect(() => {
    if (receiveMessage && receiveMessage.chatId == selectedChat) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    setInput("");

    let newMessage = {
      content: input,
      chatId: selectedChat,
      _id: Date.now(),
      sender: user,
    };
    setMessages([...messages, newMessage]);
    await sendMessage(newMessage.content);

    // send message to socket server
    // SETTING UP LOGIC FOR SINGLE CHAT ONLY
    let { users } = chatNames.find((x) => {
      return x._id === selectedChat;
    });
    console.log("🚀 ~ file: ChatBox.jsx:50 ~ handleSend ~ chat", users);
    let receiverId = users.filter((x) => x._id != user._id);
    receiverId = receiverId[0]._id;

    setSocketMessage({
      newMessage,
      receiverId,
    });
  }

  function getMessageStyles(message) {
    let style = {
      display: "flex",
    };
    if (message.sender._id === user._id) style.flexDirection = "row-reverse";

    return style;
  }
  function getContentStyles(message) {
    let style = {
      display: "flex",
      backgroundColor: "yellow",
      padding: "3px",
      margin: "2px",
      borderRadius: "0px 10px 10px 10px",
    };
    if (message.sender._id === user._id) {
      style.backgroundColor = "cyan";
      style.borderRadius = "10px 0px 10px 10px";
    }

    return style;
  }
  return (
    <div className="chat-box">
      {selectedChat ? (
        <>
          <div className="message-container">
            <div className="messages">
              {messages &&
                messages.map((message) => (
                  <div
                    style={getMessageStyles(message)}
                    ref={scroll}
                    key={message._id}
                  >
                    <p style={getContentStyles(message)}>{message.content}</p>
                  </div>
                ))}
            </div>
            <div className="send-message">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Click on a chat to continue</h1>
        </>
      )}
    </div>
  );
}
