import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/login";
import Chat from "./component/chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
