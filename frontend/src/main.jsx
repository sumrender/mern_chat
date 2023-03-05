import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RootContextProvider from "./context/RootContext";
import "./index.css";
import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RootContextProvider>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </RootContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
