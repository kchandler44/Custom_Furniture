const express = require('express');
const task = express.Router();
const taskController = require('../controllers/taskController');

// post request to add tasks
task.post('/add', taskController.addTask, (req, res) => {
  return res.status(200).json(res.locals.task);
});

//get request to get all tasks
task.get('/get', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.allTasks);
});

//finds and updates a document
task.patch('/update/:id', taskController.updateTask, (req, res) => {
  console.log('what up');
  return res.status(200).json(res.locals.changed);
});

task.delete('/delete/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.deletedTask);
});

module.exports = task;
