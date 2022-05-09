import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/login/Login";
import Home from "./pages/user/home/Home";
import Profile from "./pages/user/profile/Profile";
import Room from "./pages/user/room/Room";

import Game from "./pages/admin/game/Game";
import Report from "./pages/admin/report/Report";
import Dashboard from "./pages/admin/Dashboard/Dashboard"

import LayoutUser from "./components/layout/LayoutUser";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import Loading from "./components/loading/Loading";

import AutoLoginUser from "./auth/AutoLoginUser";
import RequireAuthAdmin from "./auth/RequireAuthAdmin";
import Logout from "./auth/Logout";

import 'antd/dist/antd.min.css';
import 'swiper/css';
import './App.scss';

const ChatRoom = React.lazy(() => import("./pages/user/chat/Chat"));
const PostDetail = React.lazy(() => import("./pages/user/postDetail/PostDetail"));

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/login" name="login" element={<Login />} />
          <Route exact path="/logout" name="logout" element={<Logout />} />
          <Route element={<AutoLoginUser />}>
            {/* User routing */}
            <Route exact path="/" element={<LayoutUser />}>
              <Route exact path="" name="home" element={<Home />} />
              <Route exact path="post/:id" name="home" element={<React.Suspense fallback={<Loading />}><PostDetail /></React.Suspense>} />
              <Route exact path="profile/:user" name="profile" element={<Profile />} />
              <Route exact path="roomchat" name="room" element={<Room />} />
              <Route exact path="roomchat/:id" name="chat" element={<React.Suspense fallback={<Loading />}><ChatRoom /></React.Suspense>} />
            </Route>
            {/* Admin routing */}
            <Route element={<RequireAuthAdmin />}>
              <Route exact path="/admin" element={<LayoutAdmin />}>
                <Route path="" name="admin page" element={<Dashboard />} />
                <Route path="report" name="admin page" element={<Report />} />
                <Route path="game" name="admin page" element={<Game />} />
              </Route>
            </Route>

          </Route>



          {/* No match routing */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
