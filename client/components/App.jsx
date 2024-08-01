import React from 'react';
import '../assets/styles.scss';
import TaskList from './TaskList.jsx';

const App = () => {
  return (
    <div>
      <h1 id='title'>
        Aamold Custom Furniture
      </h1>
      <div>
        <TaskList />
      </div>
    </div>
  );
};

export default App;
