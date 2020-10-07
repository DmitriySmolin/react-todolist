import React, { useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";
import { TaskStatuses, TaskType } from "./api/todolists-api";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const onClickHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todolistId);
  }, [props.removeTask, props.todolistId]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(
        props.task.id,
        e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
        props.todolistId
      );
    },
    [props.changeTaskStatus, props.todolistId]
  );

  const onChangeTaskTitle = useCallback(
    (newTitle: string) => {
      props.changeTaskTitle(props.task.id, newTitle, props.todolistId);
    },
    [props.changeTaskTitle, props.todolistId]
  );

  return (
    <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox color={"primary"} checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTaskTitle} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
