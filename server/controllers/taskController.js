const Task = require('../models/taskModel');

const taskController = {};

taskController.addTask = async (req, res, next) => {
  try {
    const { task_name } = req.body;
    const createdTask = await Task.create({ task_name });
    res.locals.task = createdTask;
    return next();
  } catch (err) {
    next(console.log('you have an error: ', err));
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    const all = await Task.find();
    res.locals.allTasks = all;
    return next();
  } catch (error) {
    return next('you have an error: ', error);
  }
};

taskController.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task_name } = req.body;
    const taskToUpdate = await Task.findOneAndUpdate(
      { _id: id },
      { task_name: task_name },
      { new: true }
    );
    res.locals.changed = taskToUpdate;
    return next();
  } catch (err) {
    return next('err: ', err);
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    const id = req.params;
    const deleted = await Task.findOneAndDelete(id.id);
    res.locals.deletedTask = deleted;
    return next();
  } catch (err) {
    return next('err: ', err);
  }
};

module.exports = taskController;
