import { useEffect } from "react";
import useChatContext from "../hooks/useChatContext";
import useRootContext from "../hooks/useRootContext";

export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

const styles = {
  chatNames: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  chatName: {},
};

export default function ChatNames() {
  const { user } = useRootContext();
  const { chatNames, fetchAllMessages, setSelectedChat, getChatUsers } =
    useChatContext();

  async function onFirstRender() {
    await getChatUsers();
  }

  useEffect(() => {
    if (user) onFirstRender();
  }, [user]);

  return (
    <>
      <div className="chats">
        {chatNames.map((chatName) => (
          <div key={chatName._id} className="chat">
            <button
              onClick={() => {
                setSelectedChat(chatName._id);
                fetchAllMessages(chatName._id);
              }}
            >
              {getSender(user, chatName.users)}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
