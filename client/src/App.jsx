import React from "react";
import TodoList from "./todolist/TodoList";
import GetTodo from "./todolist/GetTodo";
import { ComponentProvider } from "./todolist/ComponentProvider";
import { Route, Routes } from "react-router-dom";
import EditTodo from "./todolist/EditTodo";
import UserReg from "./user/UserReg";

function App() {
  return (
    <>
      <ComponentProvider>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/getTodo" element={<GetTodo />} />
          <Route path="/getTodo/:id" element={<EditTodo />} />
          <Route path="/regTodo" element={<UserReg/>} />
        </Routes>
      </ComponentProvider>
    </>
  );
}

export default App;
