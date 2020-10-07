import React, { useReducer } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  todolistsReducer,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  removeTodolistAC,
  addTodolistAC,
  FilterValueType,
} from "./state/todolists-reducer";
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";
import { TaskPriorities, TaskStatuses, TaskType } from "./api/todolists-api";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducers() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
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

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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

  const removeTask = (taskId: string, todolistId: string) => {
    dispatchToTasks(removeTaskAC(taskId, todolistId));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatchToTasks(addTaskAC(title, todolistId));
  };

  const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatchToTasks(changeTaskStatusAC(taskId, status, todolistId));
  };

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistId));
  };

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    dispatchToTodolist(changeTodolistTitleAC(todolistId, newTitle));
  };

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    dispatchToTodolist(changeTodolistFilterAC(todolistId, value));
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolist(action);
    dispatchToTasks(action);
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolist(action);
    dispatchToTasks(action);
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

export default AppWithReducers;
