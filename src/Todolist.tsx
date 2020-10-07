import React, { useCallback } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton, Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import Task from "./Task";
import { TaskStatuses, TaskType } from "./api/todolists-api";
import { FilterValueType } from "./state/todolists-reducer";

type TodolistPropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValueType, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
};

export const Todolist: React.FC<TodolistPropsType> = React.memo((props) => {
  console.log("Todolist is called");
  let tasksForTodoList = props.tasks;

  if (props.filter === "active") {
    tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.todolistId);
  }, [props.todolistId, props.changeFilter]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.todolistId);
  }, [props.todolistId, props.changeFilter]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.todolistId);
  }, [props.todolistId, props.changeFilter]);

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolistId);
    },
    [props.addTask, props.todolistId]
  );

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.todolistId, newTitle);
    },
    [props.changeTodolistTitle, props.todolistId]
  );

  const onRemoveTodolist = () => {
    props.removeTodolist(props.todolistId);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={onRemoveTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {tasksForTodoList.map((t) => (
          <Task
            task={t}
            todolistId={props.todolistId}
            removeTask={props.removeTask}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            key={t.id}
          />
        ))}
      </div>
      <div>
        <Button color={"default"} variant={props.filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler}>
          All
        </Button>
        <Button
          color={"primary"}
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
