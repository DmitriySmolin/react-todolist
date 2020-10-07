import axios from "axios";
import { FilterValueType } from "../state/todolists-reducer";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "00e119a9-4fb8-4595-827b-ec20d2d596cd",
  },
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
  filter: FilterValueType;
};

type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TaskType = {
  description: string;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("/todo-lists", { title: title });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updataTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title: title });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, taskTitle: string) {
    return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/`, { title: taskTitle });
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
