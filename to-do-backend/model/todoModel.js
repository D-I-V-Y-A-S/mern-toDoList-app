const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
    todoItem: {
        type: String,
        required: true
    },

    done: {
        type: Boolean,
        default: false
    }
}
    ,
    {
        collection: 'todoItems'
    }
)

module.exports = mongoose.model('todoItems', ToDoSchema)