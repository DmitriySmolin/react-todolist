import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValueType>('all');


  const removeTask = (id: string) => {
    let filtetedTasks = tasks.filter(t => t.id !== id)
    setTasks(filtetedTasks)
  }

  const changeFilter = (value: FilterValueType) => {
    setFilter(value);
  }

  const addTask = (title: string) => {
    let task = { id: v1(), title: title, isDone: false }
    let newTasks = [task, ...tasks]
    setTasks(newTasks);
  }

  const changeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find(t => t.id === id);
    if (task) task.isDone = isDone;
    setTasks([...tasks]);
  }

  let tasksForTodoList = tasks;

  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => !t.isDone);
  }
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone);
  }

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeStatus} filter={filter} />
    </div>
  );
}

export default App;
