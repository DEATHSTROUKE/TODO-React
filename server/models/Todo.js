const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: String,
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Todo', schema)