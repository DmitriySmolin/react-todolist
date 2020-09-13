import { TaskStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  taskTitle: string;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};

export type ChangeTaskTitlesActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  taskTitle: string;
  todolistId: string;
};

export type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitlesActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TaskStateType = {};

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.taskTitle, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );
      return { ...state };
    }
    case "CHANGE-TASK-TITLE": {
      let todolistTasks = state[action.todolistId];
      state[action.todolistId] = todolistTasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.taskTitle } : t
      );
      return { ...state };
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId } as const;
};

export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskActionType => {
  return { type: "ADD-TASK", todolistId: todolistId, taskTitle: taskTitle } as const;
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return { type: "CHANGE-TASK-STATUS", taskId: taskId, isDone: isDone, todolistId: todolistId } as const;
};

export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string) => {
  return { type: "CHANGE-TASK-TITLE", taskId: taskId, taskTitle: taskTitle, todolistId: todolistId } as const;
};
