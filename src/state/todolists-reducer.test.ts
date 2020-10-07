import { v1 } from "uuid";

import {
  todolistsReducer,
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  TodolistDomainType,
  FilterValueType,
  changeTodolistFilterAC,
} from "./todolists-reducer";

export let todolistId1: string;
export let todolistId2: string;

let startState: Array<TodolistDomainType>;

test("correct todolist should be removed", () => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  todolistId1 = v1();
  todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ];

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = "New Todolist";

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ];

  // const action = {
  //   type: "CHANGE-TODOLIST-TITLE"  as const,
  //   id: todolistId2,
  //   title: newTodolistTitle,
  // };

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValueType = "all";

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
  ];

  // const action = {
  //   type: "CHANGE-TODOLIST-FILTER" as const,
  //   id: todolistId2,
  //   filter: newFilter,
  // };

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
