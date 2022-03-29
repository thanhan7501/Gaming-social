import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/login/Login"
import Register from "./pages/user/register/Register"
import Home from "./pages/user/home/Home";
import Profile from "./pages/user/profile/Profile";
import AutoLoginUser from "./auth/AutoLoginUser"

import './App.css';

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
          <Route exact path="/register" name="login" element={<Register />} />
          <Route element={<AutoLoginUser />}>
            <Route exact path="/" name="home" element={<Home />} />
            <Route exact path="/:user" name="profile" element={<Profile />} />
          </Route>

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
