import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForum from "./forum_components/Register_forum";
import LoginForum from "./forum_components/Login_forum";
import HomeForum from "./forum_components/Home_forum";
import RepliesForum from "./forum_components/Replies_forum";

const App_forum = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginForum />} />
                    <Route path='/register_forum' element={<RegisterForum />} />
                    <Route path='/dashboard' element={<HomeForum />} />
                    <Route path='/:id/replies' element={<RepliesForum />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App_forum;