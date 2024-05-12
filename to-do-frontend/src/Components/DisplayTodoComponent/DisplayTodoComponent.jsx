import axios from 'axios'
import React, { useEffect, useState } from 'react'

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"></link>

import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

import './DisplayTodoComponent.css'

const DisplayTodoComponent = () => {
    const [toDoItems, setToDoItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3500/api/v1/todolist')
            .then(response => setToDoItems(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleDelete = (item) => {
        axios
            .delete(`http://localhost:3500/api/v1/todolist/${item}`)
            .then(response => {
                if (response.status == 200) {
                    window.location.reload();
                }
            })
            .catch(error => {
                alert(`Status (${error.response.status}) - ${error.response.data.message}`)
            })
    }

    const handleIcon = (id) => {
        axios.put(`http://localhost:3500/api/v1/todolist/${id}`)
        .then(response=>  {
            if (response.status == 200){
           console.log(response.data.message)
           window.location.reload();
           {item.done === true ? <BsFillCheckCircleFill /> : <BsCircleFill/>}
        }

        })
        .catch(error=>alert(`Status (${error.response.status}) - ${error.response.data.message}`))
    }

    return (
        <React.Fragment>
            {
                (toDoItems.length === 0) ? (<h2 className='info'>NO TASKS TO DO!!</h2>) :
                    (toDoItems.map((item, index) => (

                        <div key={index} className='todoItems'>

{item.done === true ? <BsFillCheckCircleFill /> : <BsCircleFill/>}
                            <span className='task' onClick={() => handleIcon(item._id)}>
                            {item.done===true ? <del>{item.todoItem}</del> :  item.todoItem }
                                 </span>                          
                            
                            <i className="bi bi-trash" onClick={() => handleDelete(item.todoItem)}></i>
                        </div>
                    )))
            }
        </React.Fragment>
    )
}

export default DisplayTodoComponent