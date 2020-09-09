import React from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  addTodolistAC,
} from "./state/todolists-reducer";
import { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";
import { AppRootStateType } from "./state/store";
import { useSelector, useDispatch } from "react-redux";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValueType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValueType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks);
  const dispatch = useDispatch();

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC(taskId, todolistId));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  };

  const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
  };

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, newTitle));
  };

  const changeFilter = (todolistId: string, value: FilterValueType) => {
    dispatch(changeTodolistFilterAC(todolistId, value));
  };

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));
  };

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  const jsxTodolists = todolists.map((tl) => {
    let tasksForTodoList = tasks[tl.id];

    if (tl.filter === "active") {
      tasksForTodoList = tasks[tl.id].filter((t) => !t.isDone);
    }
    if (tl.filter === "completed") {
      tasksForTodoList = tasks[tl.id].filter((t) => t.isDone);
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

export default AppWithRedux;
