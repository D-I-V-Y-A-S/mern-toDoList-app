import React from 'react'
import ToDoComponent from './Components/ToDoComponent/ToDoComponent'
import './App.css'
import DisplayTodoComponent from './Components/DisplayTodoComponent/DisplayTodoComponent'

const App = () => {
  return (
    <React.Fragment>
      <ToDoComponent/>
      <DisplayTodoComponent/>
    </React.Fragment>
  )
}

export default App