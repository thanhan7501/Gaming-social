import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/login/Login"
import PostDetail from "./pages/user/postDetail/PostDetail"
import Home from "./pages/user/home/Home";
import Profile from "./pages/user/profile/Profile";
import AutoLoginUser from "./auth/AutoLoginUser"

import 'antd/dist/antd.css'
import 'swiper/css';
import './App.scss';
import TestUI from "./pages/user/test";

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
          {/* User routing */}
          <Route exact path="/login" name="login" element={<Login />} />
          <Route element={<AutoLoginUser />}>
            <Route exact path="/" name="home" element={<Home />} />
            <Route exact path="/post/:id" name="home" element={<PostDetail />} />
            <Route exact path="/user/:user" name="profile" element={<Profile />} />
          </Route>
          <Route exact path="/test" element={<TestUI/>} />

          {/* Admin routing */}
          {/* <Route element={<RequireAuthAdmin />}> */}
          {/* <Route path="/admin" name="admin page" element={<Admin />} />
            <Route
              path="/admin/create"
              name="create game page"
            element={<Create />}
            /> */}

          {/* <Route
              path="/admin/register"
              name="register admin page"
            element={<Register />}
            /> */}
          {/* </Route>
          
          */}

          {/* No match routing */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
