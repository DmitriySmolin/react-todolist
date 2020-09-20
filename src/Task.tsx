import React, { useCallback } from "react";
import { TaskType } from "./AppWithRedux";
import { Checkbox, IconButton } from "@material-ui/core";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (id: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
};

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  const onClickHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todolistId);
  }, [props.removeTask, props.todolistId]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
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
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox color={"primary"} checked={props.task.isDone} onChange={onChangeHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTaskTitle} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
