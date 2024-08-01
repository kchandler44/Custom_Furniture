import React, { useState } from 'react';

const Task = ({ item, deleteTask, updateTask }) => {
  return (
    <div>
      {item.task_name}
      <button className='button' onClick={() => deleteTask(item._id)}>
        x
      </button>
      <button className='button' onClick={(e) => updateTask(item._id)}>
        Update Task
      </button>
    </div>
  );
};

export default Task;
