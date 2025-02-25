import React, { useState } from 'react';
import './ToDoComponent.css';
import axios from 'axios';
import BASE_URL from "../../../config";  

const ToDoComponent = () => {
  const [task, setTask] = useState(""); 

  const inputHandler = (event) => {
    setTask(event.target.value);
  };

  const taskHandler = () => {
    axios
      .post(`${BASE_URL}/add`, { todoData: task })  
      .then(response => {
        if (response.status === 201) {
          window.location.reload();
        }
      })
      .catch(error => {
        const status = error.response?.status || "Unknown";
        const message = error.response?.data?.message || "No message available";
        alert(`Status (${status}) - ${message}`);
      });
  };

  return (
    <div className="container">
      <h1 className="heading">TO DO LIST</h1>

      <input
        type="text"
        placeholder="Enter your to-do task here..."
        name="task"
        id="addTask"
        value={task}
        onChange={inputHandler}
        className="input-task"
      />

      <button type="submit" onClick={taskHandler} className="add-button">
        ADD
      </button>
    </div>
  );
};

export default ToDoComponent;
