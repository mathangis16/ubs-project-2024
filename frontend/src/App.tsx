import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import DiscussionForum from "./pages/DiscussionForum";
import ForumUser from "./pages/ForumUser";
import RepliesUser from "./pages/RepliesUser"
import Questionaire from "./pages/Questionaire";
import Dictionary from "./pages/Dictionary";
import Menu from "./pages/Menu";
//import forum_app from "../components/forum/forum_app.js";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
//import HomeForum from "./components/forum/HomeForum";
//import Replies from "./components/forum/Replies";
//import Footer from "./components/footer/Footer";
function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/menu" element={<Menu />} />
        )}
        <Route path="/chat" element={<Chat />} />
        <Route path="/discussionForum" element={<DiscussionForum />} />
        <Route path="/forumUser" element={<ForumUser />} />
        <Route path="/repliesUser" element={<RepliesUser />} />
        <Route path="/questionaire" element={<Questionaire />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;