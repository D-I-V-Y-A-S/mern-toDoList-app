const todoItemModel = require('../model/todoModel')

const getTodoItem = async (request, response) => {
  try {
    const tasks = await todoItemModel.find()
    if (tasks) {
     return response.status(200).json(tasks)
    }
    response.status(204).json({ message: `To-Do list is empty` })
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }

}

const addTodoItem = async (request, response) => {
  const { todoData } = request.body
  try {
    const existingTodoItem = await todoItemModel.findOne({ todoItem: todoData })
    if (!existingTodoItem) {
      const todoItemToBeAdded = await todoItemModel.create({ todoItem: todoData })
      return response.status(201).json(todoItemToBeAdded)
    }
    response.status(409).json({ message: `Same todoItem can't be added twice.` })
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}

const deleteTodoItem=async(request,response)=>{
  const item=request.params.toDoItem
  console.log(item)
  try{
  await todoItemModel.findOneAndDelete({todoItem:item})
  response.status(200).send({message:"successfully deleted!"})
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}

const postDoneStatus=async(request,response)=>{
  const {id}=request.params
  try{
  
  await todoItemModel.findByIdAndUpdate({_id:id},{done:true})
  response.status(200).send({message:"updated successfully!"})
  }
  catch (error) {
    response.status(500).json({ message: error.message })
  }
}

module.exports = { addTodoItem, getTodoItem,deleteTodoItem,postDoneStatus }