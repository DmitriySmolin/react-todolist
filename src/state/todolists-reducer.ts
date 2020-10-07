import { v1 } from "uuid";
import { TodolistType } from "../api/todolists-api";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  todolistId: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterValueType;
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const initialState: Array<TodolistDomainType> = [];

export type FilterValueType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
};

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId);
    case "ADD-TODOLIST":
      return [
        ...state,
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
          addedDate: "",
          order: 0,
        },
      ];
    case "CHANGE-TODOLIST-TITLE":
      // let todolist = state.find((tl) => tl.id === action.id);
      // if (todolist) {
      //   todolist.title = action.title;
      // }
      // return { ...state };
      return state.map((tl) => (tl.id === action.todolistId ? { ...tl, title: action.title } : tl));
    case "CHANGE-TODOLIST-FILTER":
      const todolist = state.find((tl) => tl.id === action.todolistId);
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter;
      }
      return [...state];
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", todolistId: todolistId };
};

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: newTodolistTitle, todolistId: v1() };
};

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", todolistId: todolistId, title: newTodolistTitle };
};

export const changeTodolistFilterAC = (
  todolistId: string,
  newFilter: FilterValueType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", todolistId: todolistId, filter: newFilter };
};
