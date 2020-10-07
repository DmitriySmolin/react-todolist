import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { FilterValueType, TodolistDomainType } from "./state/todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "./api/todolists-api";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ]);

  let [tasks, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistId1,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],

    [todolistId2]: [
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        todoListId: todolistId2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
      {
        id: v1(),
        title: "Rest API",
        status: TaskStatuses.New,
        todoListId: todolistId2,
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    tasks[todolistId] = tasks[todolistId].filter((t) => t.id !== id);
    setTasks({ ...tasks });
  };

  const addTask = (title: string, todolistId: string) => {
    let task = {
      id: v1(),
      title: title,
      status: TaskStatuses.New,
      todoListId: todolistId,
      description: "",
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
    };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({ ...tasks });
  };

  const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.status = status;
      setTasks({ ...tasks });
    }
  };

  const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  };

  const changeTodolistTitle = (newTitle: string, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
    }
    setTodolists([...todolists]);
  };

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
    }
    setTodolists([...todolists]);
  };

  const removeTodolist = (todolistId: string) => {
    let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists([...filteredTodolists]);
    delete tasks[todolistId];
    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    let todolist: TodolistDomainType = {
      id: v1(),
      title: title,
      filter: "all",
      addedDate: "",
      order: 0,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ [todolist.id]: [], ...tasks });
  };

  const jsxTodolists = todolists.map((tl) => {
    let tasksForTodoList = tasks[tl.id];

    if (tl.filter === "active") {
      tasksForTodoList = tasks[tl.id].filter((t) => t.status === TaskStatuses.New);
    }
    if (tl.filter === "completed") {
      tasksForTodoList = tasks[tl.id].filter((t) => t.status === TaskStatuses.Completed);
    }

    return (
      <Grid item>
        <Paper style={{ padding: "10px" }}>
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          />
        </Paper>
      </Grid>
    );
  });

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid spacing={3} container>
          {jsxTodolists}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
