const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task_name: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);