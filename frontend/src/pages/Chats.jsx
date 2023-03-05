import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatNames from "../components/ChatNames";
import useRootContext from "../hooks/useRootContext";
import useChatContext from "../hooks/useChatContext";
import Search from "../components/Search";

export default function Chats() {
  const navigate = useNavigate();
  const { error } = useChatContext();
  const { user, ENV_VARIABLES } = useRootContext();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receiveMessage, setReceiveMessage] = useState();
  const [socketMessage, setSocketMessage] = useState(null);
  const socket = useRef();

  if (error?.message) console.log(error);

  useEffect(() => {
    if (!user) return;

    socket.current = io(ENV_VARIABLES.socketUrl);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    socket.current?.on("receive-message", (newMessage) => {
      setReceiveMessage(newMessage);
    });
  });

  useEffect(() => {
    if (!socketMessage) return;
    console.log(socketMessage);
    socket.current.emit("send-message", socketMessage);
  }, [socketMessage]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  return (
    <div className="chat-container">
      <div>
        <Search />
        <div className="line"></div>

        <div className="chat-flex">
          <ChatNames />
          <div className="divider"></div>
          <ChatBox
            setSocketMessage={setSocketMessage}
            receiveMessage={receiveMessage}
          />
        </div>
      </div>
    </div>
  );
}
