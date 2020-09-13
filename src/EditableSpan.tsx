import React, { useState } from "react";
import { TextField } from "@material-ui/core";

type EditableSpanPropsType = {
  title: string;
  onChange: (newTitle: string) => void;
};

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
  console.log("EditableSpan is called");
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
    <TextField
      size="small"
      variant="outlined"
      type="text"
      value={title}
      autoFocus
      onBlur={deActivatedEditMode}
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  );
});
