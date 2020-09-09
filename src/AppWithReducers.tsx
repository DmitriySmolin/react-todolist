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
} from "./state/todolists-reducer";
import { tasksReducer, removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } from "./state/tasks-reducer";

// export type TaskType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// export type FilterValueType = "all" | "active" | "completed";

// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterValueType;
// };

// export type TaskStateType = {
//   [key: string]: Array<TaskType>;
// };

// function AppWithReducers() {
//   let todolist1 = v1();
//   let todololist2 = v1();

//   let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
//     {
//       id: todolist1,
//       title: "What to learn",
//       filter: "all",
//     },
//     {
//       id: todololist2,
//       title: "What to buy",
//       filter: "all",
//     },
//   ]);

//   let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//     [todolist1]: [
//       { id: v1(), title: "HTML&CSS", isDone: true },
//       { id: v1(), title: "JS", isDone: true },
//     ],

//     [todololist2]: [
//       { id: v1(), title: "ReactJS", isDone: false },
//       { id: v1(), title: "Rest API", isDone: false },
//     ],
//   });

//   const removeTask = (taskId: string, todolistId: string) => {
//     dispatchToTasks(removeTaskAC(taskId, todolistId));
//   };

//   const addTask = (title: string, todolistId: string) => {
//     dispatchToTasks(addTaskAC(title, todolistId));
//   };

//   const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
//     dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistId));
//   };

//   const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
//     dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todolistId));
//   };

//   const changeTodolistTitle = (todolistId: string, newTitle: string) => {
//     dispatchToTodolist(changeTodolistTitleAC(todolistId, newTitle));
//   };

//   const changeFilter = (todolistId: string, value: FilterValueType) => {
//     dispatchToTodolist(changeTodolistFilterAC(todolistId, value));
//   };

//   const removeTodolist = (todolistId: string) => {
//     const action = removeTodolistAC(todolistId);
//     dispatchToTodolist(action);
//     dispatchToTasks(action);
//   };

//   const addTodolist = (title: string) => {
//     const action = addTodolistAC(title);
//     dispatchToTodolist(action);
//     dispatchToTasks(action);
//   };

//   const jsxTodolists = todolists.map((tl) => {
//     let tasksForTodoList = tasks[tl.id];

//     if (tl.filter === "active") {
//       tasksForTodoList = tasks[tl.id].filter((t) => !t.isDone);
//     }
//     if (tl.filter === "completed") {
//       tasksForTodoList = tasks[tl.id].filter((t) => t.isDone);
//     }

//     return (
//       <Grid item>
//         <Paper style={{ padding: "10px" }}>
//           <Todolist
//             key={tl.id}
//             todolistId={tl.id}
//             title={tl.title}
//             tasks={tasksForTodoList}
//             removeTask={removeTask}
//             changeFilter={changeFilter}
//             addTask={addTask}
//             changeTaskStatus={changeTaskStatus}
//             filter={tl.filter}
//             removeTodolist={removeTodolist}
//             changeTaskTitle={changeTaskTitle}
//             changeTodolistTitle={changeTodolistTitle}
//           />
//         </Paper>
//       </Grid>
//     );
//   });

//   return (
//     <div className="App">
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <Menu />
//           </IconButton>
//           <Typography variant="h6">News</Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//       <Container fixed>
//         <Grid container style={{ padding: "20px" }}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>
//         <Grid spacing={3} container>
//           {jsxTodolists}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default AppWithReducers;
