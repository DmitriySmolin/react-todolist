import { TodolistType, FilterValueType } from "../App";
import { v1 } from "uuid";

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

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
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
      return state.map((tl) => (tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl));
    default:
      throw new Error("I don't understand this type");
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
