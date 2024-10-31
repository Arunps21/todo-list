import React from 'react'
import TodoList from './todolist/TodoList'
import GetTodo from './todolist/GetTodo'
import { ComponentProvider } from './todolist/ComponentProvider'


function App() {
  return (
    <>
    <ComponentProvider>
    <TodoList/>
    <GetTodo/>
    </ComponentProvider>
    </>
  )
}

export default App