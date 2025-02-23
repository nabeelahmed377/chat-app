import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatMsg from "./ChatMsg";
import { SlLogout } from "react-icons/sl";
import { BASE_URL } from "../../config";

const socket = io(BASE_URL);

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 🔥 Stores selected user for chat

  useEffect(() => {
    // Retrieve user data from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const userDataString = urlParams.get("user");

    if (userDataString) {
      localStorage.setItem("user", userDataString);
      setUser(JSON.parse(userDataString));
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      else navigate("/");
    }

    return () => {
      socket.off("message");
    };
  }, []);

  // ✅ Fetch all users
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  // ✅ Fetch messages when `selectedUser` changes
  useEffect(() => {
    if (!selectedUser || !user) return;

    fetch(`${BASE_URL}/messages/${user._id}/${selectedUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("Error", err));

    return () => {
      socket.off("message");
    };
  }, [selectedUser]);

  const sendMessage = () => {
    if (text.trim() && user && selectedUser) {
      const newMessage = {
        text,
        user: user.name,
        userId: user._id,
        receiverId: selectedUser._id,
      };
      socket.emit("sendMessage", newMessage);
      setText("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    fetch(`${BASE_URL}/logout`)
      .then(() => navigate("/"))
      .catch((err) => console.error("Logout error:", err));
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="w-1/4 bg-white border-r border-gray-300">
          <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Chat Buddy 🤞</h1>

            <button
              onClick={handleLogout}
              className="bg-violet-300 p-2 rounded text-white"
            >
              <SlLogout />
            </button>
          </header>

          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {userData.map((u) => (
              <div
                key={u._id}
                className={`flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md ${
                  selectedUser?._id === u._id ? "bg-blue-300" : "bg-grey-400"
                }`}
                onClick={() => setSelectedUser(u)}
              >
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                  <img
                    src={
                      u.image ||
                      "https://placehold.co/200x/ffa8e4/ffffff.svg?text=User&font=Lato"
                    }
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{u.name}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1">
          <header className="bg-white p-4 text-gray-700 flex justify-between">
            <h1 className="text-2xl font-semibold">
              {selectedUser
                ? `Chat with ${selectedUser.name}`
                : "Select a user"}
            </h1>
            <h3>
              <p>You are logged in as {user?.name}</p>
            </h3>
          </header>

          <div className="h-screen overflow-y-auto p-4 pb-36">
            {selectedUser ? (
              messages.map((mess, index) => (
                <div
                  key={index}
                  className={`flex ${
                    mess.userId === user?._id ? "justify-end" : "justify-start"
                  } mb-4 cursor-pointer`}
                >
                  <ChatMsg mess={mess} />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-10">
                Select a user to start chatting
              </p>
            )}
          </div>

          {selectedUser && (
            <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button
                  className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
            </footer>
          )}
        </div>
      </div>
    </>
  );
}
