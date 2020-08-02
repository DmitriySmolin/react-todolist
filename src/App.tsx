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

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolist1 = v1();
  let todololist2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    {
      id: todolist1,
      title: 'What to learn',
      filter: 'all',
    },
    {
      id: todololist2,
      title: 'What to buy',
      filter: 'all',
    },
  ]);

  let [tasks, setTasks] = useState<TaskStateType>({
    [todolist1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
    ],

    [todololist2]: [
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter((t) => t.id !== id);
    setTasks({ ...tasks });
  };

  const addTask = (title: string, todolistId: string) => {
    let task = { id: v1(), title: title, isDone: false };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  };

  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    let todolistTask = tasks[todolistId];
    let task = todolistTask.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  };

  const changeFilter = (value: FilterValueType, id: string) => {
    // setTodolists(value);
    let todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  };

  const removeTodolist = (id: string) => {
    let filteredTodolists = todolists.filter((tl) => tl.id !== id);
    setTodolists([...filteredTodolists]);
    delete tasks[id];
    setTasks({ ...tasks });
  };

  const jsxTodolistItems = todolists.map((tl) => {
    let allTodolistTasks = tasks[tl.id];
    let tasksForTodoList = allTodolistTasks;

    if (tl.filter === 'active') {
      tasksForTodoList = allTodolistTasks.filter((t) => !t.isDone);
    }
    if (tl.filter === 'completed') {
      tasksForTodoList = allTodolistTasks.filter((t) => t.isDone);
    }
    return (
      <Todolist
        key={tl.id}
        todolistId={tl.id}
        title={tl.title}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={tl.filter}
        removeTodolist={removeTodolist}
      />
    );
  });

  return <div className="App">{jsxTodolistItems}</div>;
}

export default App;
