import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

export default function useChatContext() {
  return useContext(ChatContext);
}
