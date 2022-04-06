import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/login/Login";
import PostDetail from "./pages/user/postDetail/PostDetail";
import Home from "./pages/user/home/Home";
import Profile from "./pages/user/profile/Profile";

import Game from "./pages/admin/game/Game";

import LayoutUser from "./components/layout/LayoutUser";
import LayoutAdmin from "./components/layout/LayoutAdmin";

import AutoLoginUser from "./auth/AutoLoginUser";

import 'antd/dist/antd.css';
import 'swiper/css';
import './App.scss';

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
          <Route element={<AutoLoginUser />}>
            {/* User routing */}
            <Route exact path="/" element={<LayoutUser />}>
              <Route exact path="" name="home" element={<Home />} />
              <Route exact path="post/:id" name="home" element={<PostDetail />} />
              <Route exact path="profile/:user" name="profile" element={<Profile />} />
            </Route>
            {/* Admin routing */}
            {/* <Route element={<RequireAuthAdmin />}> */}
            <Route exact path="/admin" element={<LayoutAdmin />}>
              {/* <Route path="" name="admin page" element={<Admin />} /> */}
              <Route path="game" name="admin page" element={<Game />} />
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
