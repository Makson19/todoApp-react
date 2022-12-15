const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const todoSchema = new Schema({
    description: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now }
})

const Task = mongoose.model('Task', todoSchema);
// const Task = mongoose.model('Task', {
//     description: String,
//     done: Boolean,
//     createAt: Date
// })

module.exports = Task;