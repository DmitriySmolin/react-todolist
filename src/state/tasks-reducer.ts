import { TaskStateType } from "../App";
import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";

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

export const tasksReducer = (state: TaskStateType, action: ActionsType): TaskStateType => {
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
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const task = tasks.find((t) => t.id === action.taskId);
      if (task) {
        task.title = action.taskTitle;
      }
      return stateCopy;
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
      throw new Error("I don't understand this type");
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
