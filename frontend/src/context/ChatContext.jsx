import useRootContext from "../hooks/useRootContext";
import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { ENV_VARIABLES, user } = useRootContext();
  const [chatNames, setChatNames] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (!user) return;
  }, []);

  const getChatUsers = async () => {
    setLoading(true);
    let endpoint = "/api/chat";
    try {
      const response = await fetch(ENV_VARIABLES.serverUrl + endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();


      setLoading(false);
      if (!response.ok) {
        console.log("here");
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      } else {
        setChatNames(data);
      }
    } catch (err) {
      console.log("in catch block", err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };

  const createChat = async (userId) => {
    setLoading(true);

    try {
      const response = await fetch(ENV_VARIABLES.serverUrl + "/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();

      setLoading(false);
      if (!response.ok)
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      else {
        let idx = chatNames.findIndex((chat) => chat._id === data._id);

        if (idx === -1) setChatNames([data, ...chatNames]);
        setSelectedChat(data._id);
      }
    } catch (err) {
      console.log(err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };


  const fetchAllMessages = async (chatId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ENV_VARIABLES.serverUrl}/api/message/${chatId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      setLoading(false);
      if (!response.ok)
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      else {
        setMessages(data);
      }
    } catch (err) {
      console.log("in catch block", err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };

  const searchUser = async (query) => {
    setLoading(true);
    if (!query || query === "" || query === " ") {
      setError({
        show: true,
        severity: "warning",
        message: "Search Field is empty",
      });
    }

    try {
      const response = await fetch(
        ENV_VARIABLES.serverUrl + `/api/user?search=${query}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      setLoading(false);
      if (!response.ok)
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      else {
        setSearchResults(data);
      }
    } catch (err) {
      console.log("in catch block", err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };

  const sendMessage = async (content) => {
    setLoading(true);
    console.log("inside sendmessage");
    try {
      const response = await fetch(ENV_VARIABLES.serverUrl + "/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ chatId: selectedChat, content }),
      });
      const data = await response.json();
      console.log("after awaiting for response");
      setLoading(false);
      if (!response.ok)
        setError({
          show: true,
          severity: "error",
          message: data.message,
        });
      else {
        console.log(content, "send");
      }
    } catch (err) {
      console.log(err);
      setError({
        show: true,
        severity: "error",
        message: err.message,
      });
      setLoading(false);
    }
  };

  const value = {
    chatNames,
    setChatNames,
    searchResults,
    setSearchResults,
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    loading,
    setLoading,
    error,
    setError,
    getChatUsers,
    createChat,
    fetchAllMessages,
    searchUser,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
