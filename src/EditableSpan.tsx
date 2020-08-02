import React, { useState } from 'react';

type EditableSpanPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState<boolean>(false);

  let [title, setTitle] = useState<string>(props.title);

  const activatedEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const deActivatedEditMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const onChangeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <input type="text" value={title} autoFocus onBlur={deActivatedEditMode} onChange={onChangeTitleHandler} />
  ) : (
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  );
}
