import axios from "axios";
import React, { useEffect, useState } from "react";
import BASE_URL from "../../../config";

import { BsCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";

import "./DisplayTodoComponent.css";

const DisplayTodoComponent = () => {
  const [toDoItems, setToDoItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}`)
      .then((response) => setToDoItems(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setToDoItems((prevItems) => prevItems.filter((item) => item._id !== id));
        }
      })
      .catch((error) => {
        alert(`Status (${error.response.status}) - ${error.response.data.message}`);
      });
  };

  const handleIcon = (id) => {
    axios
      .put(`${BASE_URL}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setToDoItems((prevItems) =>
            prevItems.map((item) =>
              item._id === id ? { ...item, done: !item.done } : item
            )
          );
        }
      })
      .catch((error) =>
        alert(`Status (${error.response.status}) - ${error.response.data.message}`)
      );
  };

  return (
    <React.Fragment>
      {toDoItems.length === 0 ? (
        <h2 className="info">NO TASKS TO DO!!</h2>
      ) : (
        toDoItems.map((item) => (
          <div key={item._id} className="todoItems">
            <span onClick={() => handleIcon(item._id)}>
              {item.done ? <BsFillCheckCircleFill /> : <BsCircleFill />}
            </span>

            <span className="task" onClick={() => handleIcon(item._id)}>
              {item.done ? <del>{item.todoItem}</del> : item.todoItem}
            </span>

            <FiTrash2 className="delete-icon" onClick={() => handleDelete(item._id)} />
          </div>
        ))
      )}
    </React.Fragment>
  );
};

export default DisplayTodoComponent;
