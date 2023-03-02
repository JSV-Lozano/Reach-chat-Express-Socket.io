import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const SERVER = "http//localhost:4000";
const socket = io("http://localhost:4000/");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      body: "Welcome",
      from: "Admin",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    const newMessageFromMe = {
      body: message,
      from: "Yo",
    };
    setMessages([newMessageFromMe, ...messages]);
    setMessage("");
  };
  useEffect(() => {
    const recibeMessage = (message) => {
      setMessages([message, ...messages]);
    };
    socket.on("messageAllUser", recibeMessage);
    return () => {
      socket.off("messageAllUser", recibeMessage);
    };
  }, [messages]);
  return (
    <div className="App">
      <div className="Chat">
      {messages.map((message, index) => (
        <div className="bubleChat" key={index}>
          <p>
            {message.from} : {message.body}
          </p>
        </div>
      ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default App;
