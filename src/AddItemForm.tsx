import React, { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

export type addItemFormPropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<addItemFormPropsType> = React.memo((props) => {
  console.log("AddItemForm is called");
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }

    if (e.key === "Enter") {
      if (title.trim() !== "") {
        props.addItem(title);
        setTitle("");
      } else {
        setError("Title is required");
      }
    }
  };

  return (
    <div>
      <TextField
        size={"small"}
        variant="outlined"
        type="text"
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItem}>
        <AddBox />
      </IconButton>
    </div>
  );
});
