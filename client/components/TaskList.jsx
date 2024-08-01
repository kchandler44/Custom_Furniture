import React, { useState, useEffect } from 'react';
import Task from './Task.jsx';

//useEffect to fetch the list of tasks from the back end
//map through list and render a new Task component for each element

const TaskList = () => {
  const [task, setTask] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('http://localhost:3000/task/get');
      const jsonData = await data.json();
      setTask(jsonData);
    };
    const result = fetchData().catch(console.error);
  }, [taskInput]);

  const addTask = async () => {
    if (taskInput !== '') {
      const newTask = { task_name: taskInput };
      const response = await fetch('http://localhost:3000/task/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        const responseData = await response.json();
        setTask([...task, responseData]);
        setTaskInput('');
      } else {
        console.log('Failed to add task');
      }
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const deleted = await fetch(
        `http://localhost:3000/task/delete/${taskId}`,
        {
          method: 'DELETE',
        }
      );
      const data = await deleted.json();

      if (deleted.ok) {
        setTask(task.filter((item) => item._id !== taskId));
      }
    } catch (error) {
      console.log('error');
    }
  };

  const updateTask = async (taskId) => {
    const newName = { task_name: taskInput };
    console.log('okay');
    const response = await fetch(
      `http://localhost:3000/task/update/${taskId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newName),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      setTask([...task, responseData]);
      setTaskInput('');
    } else {
      console.log('Failed to update task');
    }
  };

  const tasks = task.map((item) => {
    return (
      <Task
        item={item}
        key={item._id}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    );
  });

  return (
    <div>
      {tasks}
      <input
        type='text'
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      ></input>
      <button className='button' onClick={(e) => addTask(e.target.value)}>
        Add
      </button>
    </div>
  );
};

export default TaskList;
