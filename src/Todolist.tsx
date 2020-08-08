import React from 'react';
import { TaskType, FilterValueType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { IconButton, Button, Checkbox } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValueType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (id: string) => void;
  onChange: (id: string, newTitle: string, todolistId: string) => void;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const jsxElements = props.tasks.map((t) => {
    const onClickHandler = () => props.removeTask(t.id, props.todolistId);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
    };

    const onChange = (newTitle: string) => {
      props.onChange(t.id, newTitle, props.todolistId);
    };

    return (
      <div key={t.id} className={t.isDone ? 'is-done' : ''}>
        <Checkbox color={'primary'} checked={t.isDone} onChange={onChangeHandler} />
        <EditableSpan title={t.title} onChange={onChange} />
        <IconButton onClick={onClickHandler}>
          <Delete />
        </IconButton>
      </div>
    );
  });

  const onAllClickHandler = () => {
    props.changeFilter('all', props.todolistId);
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.todolistId);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed', props.todolistId);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.todolistId);
  };

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(newTitle, props.todolistId);
  };

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
      <div>{jsxElements}</div>
      <div>
        <Button color={'default'} variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button color={'primary'} variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}>
          Completed
        </Button>
      </div>
    </div>
  );
}
