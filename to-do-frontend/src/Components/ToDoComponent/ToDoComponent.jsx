import React, { useState } from 'react';
import './ToDoComponent.css';
import axios from 'axios';
import BASE_URL from "../../../config";  // ✅ Import BASE_URL

const ToDoComponent = () => {
  const [task, setTask] = useState("");  // ✅ Use an empty string

  const inputHandler = (event) => {
    setTask(event.target.value);
  };

  const taskHandler = () => {
    axios
      .post(`${BASE_URL}/add`, { todoData: task })  // ✅ Fixed backtick issue
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
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      <div className="heading">
        <h1>TO DO LIST</h1>

        <input
          type="text"
          placeholder="Enter your to-do task here..."
          name="task"
          id="addTask"
          value={task}
          onChange={inputHandler}
        />

        <button type="submit" onClick={taskHandler}>ADD</button>
      </div>
    </React.Fragment>
  );
};

export default ToDoComponent;
