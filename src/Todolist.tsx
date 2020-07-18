import React, { useState } from 'react';
import { TaskType, FilterValueType } from './App';

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValueType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, isDone: boolean) => void;
  filter: FilterValueType;
};

export function Todolist(props: PropsType) {

  let jsxElements = props.tasks.map(t => {

    const onClickHandler = () => props.removeTask(t.id)
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
      props.changeTaskStatus(t.id, e.currentTarget.checked)

    return (<li key={t.id} className={t.isDone ? 'is-done' : ''}>
      <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
      <span>{t.title}</span>
      <button onClick={onClickHandler}>x</button>
    </li>)
  })

  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (title.trim() === '') {
      setError('Title is required');
      return false;
    };
    props.addTask(title);
    setTitle('');
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') addTask();
  }

  const onAllClickHandler = () => { props.changeFilter('all') };
  const onActiveClickHandler = () => { props.changeFilter('active') };
  const onCompletedClickHandler = () => { props.changeFilter('completed') };

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type="text" value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? 'error' : ''} />
        <button onClick={addTask}>+</button>
        {error ? <div className='error-message'>{error}</div> : ''}
      </div>
      <ul>
        {jsxElements}
      </ul>
      <div>
        <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div >
  );
}
