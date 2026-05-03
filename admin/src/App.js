import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import MainLayout from "./mainLayout";
import Login from "./components/login";
import ForgetPassword from "./components/login/forget-password";
import NewPassword from "./components/login/new-password";
import { Logout } from "./store/action";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constantMock = window.fetch;
  window.fetch = function () {
    let response;

    return new Promise((resolve, reject) => {
      constantMock
        .apply(this, arguments)
        .then((response) => {
          if (response.status === 401) {
            navigate("/", { replace: true });
            dispatch(Logout());
          }
          return resolve(response);
        })
        .catch((error) => {
          reject(response);
        });
    });
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/password" element={<ForgetPassword />} />
      <Route path="/new-password" element={<NewPassword />} />

      <Route
        exact
        path="/*"
        element={<MainLayout render={(props) => ({ ...props })} />}
      />
    </Routes>
  );
}

export default App;
