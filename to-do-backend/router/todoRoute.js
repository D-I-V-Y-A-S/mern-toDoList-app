const express=require('express')
const router=express.Router()

const {addTodoItem,deleteTodoItem,getTodoItem,postDoneStatus} = require('../Controller/todoController')

router.route('/add').post(addTodoItem)
router.route('/').get(getTodoItem)
router.route('/:toDoItem').delete(deleteTodoItem)
router.route('/:id').put(postDoneStatus)
module.exports=router