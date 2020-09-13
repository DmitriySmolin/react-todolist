import React, { useCallback } from "react";
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

const AppWithRedux = React.memo(() => {
  console.log("AppWithRedux is called");
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists);
  const tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks);
  const dispatch = useDispatch();

  const removeTask = useCallback(
    (taskId: string, todolistId: string) => {
      dispatch(removeTaskAC(taskId, todolistId));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(taskId, isDone, todolistId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (taskId: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(taskId, newTitle, todolistId));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todolistId: string, value: FilterValueType) => {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistAC(todolistId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistAC(title));
    },
    [dispatch]
  );

  const jsxTodolists = todolists.map((tl) => {
    let tasksForTodoList = tasks[tl.id];

    return (
      <Grid item key={tl.id}>
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
});

export default AppWithRedux;
