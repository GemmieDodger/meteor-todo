import React from 'react';
import { Task } from './Task'
import { TasksCollection } from '/imports/api/TasksCollection';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';

const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);
//I'm up to here: https://react-tutorial.meteor.com/simple-todos/05-styles.html

export const App = () => {
  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1}}).fetch());
  return (
  <div className="app">
    <header>
      <div className="app-bar">
            <div className="app-header">
              <h1>My First To Do List App</h1>
            </div>
      </div>
    </header>
    <div className="main">
      <TaskForm/>
      
      <ul className="tasks">
        { tasks.map(task => (
          <Task 
            key={task._id } 
            task= {task } 
            onCheckboxClick={toggleChecked}
            onDeleteClick={deleteTask}
          />
          )) }
      </ul>
    </div>
  </div>
  );
}
