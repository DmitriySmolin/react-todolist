import React, { useState } from 'react';
import { TaskType, FilterValueType } from './App';

type PropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValueType, id: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValueType;
  removeTodolist: (id: string) => void;
};

export function Todolist(props: PropsType) {
  let jsxElements = props.tasks.map((t) => {
    const onClickHandler = () => props.removeTask(t.id, props.todolistId);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);

    return (
      <li key={t.id} className={t.isDone ? 'is-done' : ''}>
        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
        <span>{t.title}</span>
        <button onClick={onClickHandler}>x</button>
      </li>
    );
  });

  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() === '') {
      setError('Title is required');
      return false;
    }
    props.addTask(title, props.todolistId);
    setTitle('');
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') addTask();
  };

  const onAllClickHandler = () => {
    props.changeFilter('all', props.todolistId);
  };
  const onActiveClickHandler = () => {
    props.changeFilter('active', props.todolistId);
  };
  const onCompletedClickHandler = () => {
    props.changeFilter('completed', props.todolistId);
  };

  return (
    <div>
      <h3>
        {props.title}
        <button onClick={() => props.removeTodolist(props.todolistId)}>x</button>
      </h3>
      <div>
        <input
          type="text"
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error ? <div className="error-message">{error}</div> : ''}
      </div>
      <ul>{jsxElements}</ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
          All
        </button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
          Active
        </button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  );
}
