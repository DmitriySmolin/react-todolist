import React, { useEffect, useState } from "react";
import axios from "axios";
import { todolistAPI } from "../api/todolists-api";

export default {
  title: "API",
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "00e119a9-4fb8-4595-827b-ec20d2d596cd",
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)} </div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist("blabla todolist").then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)} </div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "679e909d-994f-4123-b0b5-0e07fbe777b2";
    todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)} </div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    const todolistId = "a1f867ed-71ca-402e-ae66-591cb81b5ecb";
    todolistAPI.updataTodolist(todolistId, "Dima hello").then((res) => setState(res.data));
  }, []);

  return <div>{JSON.stringify(state)} </div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          type="text"
          placeholder="todolistId"
          value={todolistId}
          onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <button onClick={getTasks}>Get Tasks</button>
      </div>
    </div>
  );
};

export const deleteTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<any>("");
  const [taskId, setTaskId] = useState<any>("");

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder="todolistId"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input type="text" placeholder="taskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      <button onClick={deleteTask}>Delete Task</button>
    </div>
  );
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<any>("");
  const [todolistId, setTodolistId] = useState<any>("");

  const createTask = () => {
    todolistAPI.createTask(todolistId, taskTitle).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input
        type="text"
        placeholder="todolistId"
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}
      />
      <button onClick={createTask}>Create Task</button>
    </div>
  );
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("title 1");
  const [description, setDescription] = useState<string>("description 1");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const updateTask = () => {
    todolistAPI
      .updateTask(todolistId, taskId, {
        deadline: "",
        description: description,
        priority: priority,
        startDate: "",
        status: status,
        title: taskTitle,
      })
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <input placeholder="todolistId" value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)} />
      <input placeholder="taskId" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} />
      <input placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
      <input placeholder="Status" value={status} type="number" onChange={(e) => setStatus(+e.currentTarget.value)} />
      <input
        placeholder="Priority"
        value={priority}
        type="number"
        onChange={(e) => setPriority(+e.currentTarget.value)}
      />
      <input placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.currentTarget.value)} />
      <input placeholder="Deadline" value={deadline} onChange={(e) => setDeadline(e.currentTarget.value)} />
      <button onClick={updateTask}>Update Task</button>
    </div>
  );
};
