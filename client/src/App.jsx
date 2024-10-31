import React from "react";
import TodoList from "./todolist/TodoList";
import GetTodo from "./todolist/GetTodo";
import { ComponentProvider } from "./todolist/ComponentProvider";
import { Route, Routes } from "react-router-dom";
import EditTodo from "./todolist/EditTodo";

function App() {
  return (
    <>
      <ComponentProvider>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/getTodo" element={<GetTodo />} />
          <Route path="/getTodo/:id" element={<EditTodo />} />
        </Routes>
      </ComponentProvider>
    </>
  );
}

export default App;
