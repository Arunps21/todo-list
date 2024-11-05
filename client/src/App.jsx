import React from "react";
import { ComponentProvider } from "./todolist/ComponentProvider";
import { Route, Routes } from "react-router-dom";
import EditTodo from "./todolist/EditTodo";
import UserReg from "./user/UserReg";
import HomePage from "./todolist/HomePage";
import NavPage from "./todolist/NavPage";
import UserLogin from "./user/UserLogin";
import UserHome from "./user/UserHome";

function App() {
  return (
    <>
      <ComponentProvider>
        <NavPage/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getTodo/:id" element={<EditTodo />} />
          <Route path="/regTodo" element={<UserReg/>} />
          <Route path="/userLogin" element={<UserLogin/>} />
          <Route path="/userHome" element={<UserHome/>} />
        </Routes>
      </ComponentProvider>
    </>
  );
}

export default App;
