import React, { useState } from 'react'
import './ToDoComponent.css'
import axios from 'axios'
const ToDoComponent = () => {

//have a input field to get tasks from user and set task then send to backend to add db.

  const [task, setTask] = useState([])

  const inputHandler = (event) => {
    setTask(event.target.value)
  }

  const taskHandler = (event) => {
    axios.post('http://localhost:3500/api/v1/todolist/add', { todoData: task })
      .then(response => {
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch(error => {
        alert(`Status (${error.response.status}) - ${error.response.data.message}`)
      })
  }

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

      <div className='heading'>

        <h1>TO DO LIST</h1>

        <input
          type="text"
          placeholder="Enter your to-do-task here..."
          name="task"
          id="addTask"
          value={task}
          onChange={inputHandler}
        />
        
        <button type="submit" onClick={taskHandler}>ADD</button>

      </div>

    </React.Fragment>
  )
}

export default ToDoComponent