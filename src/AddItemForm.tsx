import React, { useState } from 'react';

export type addItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: addItemFormPropsType) {
  let [title, setTitle] = useState('');
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() === '') {
      setError('Title is required');
      return false;
    }
    props.addItem(title);
    setTitle('');
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (title.trim() === '') {
      setError('Title is required');
      return false;
    }
    if (e.key === 'Enter') {
      props.addItem(title);
      setTitle('');
    }

    setError(null);
  };

  return (
    <div>
      <input type="text" value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} className={error ? 'error' : ''} />
      <button onClick={addItem}>+</button>
      {error ? <div className="error-message">{error}</div> : ''}
    </div>
  );
}
