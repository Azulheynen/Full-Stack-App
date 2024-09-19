import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewNoteMutation } from "./notesApiSlice";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";

  return (
    <div className="form-container">
      <Paper
        sx={{
          backgroundColor: "#f9f8ee",
          padding: 3,
          width: "70%",
          margin: "auto",
          backgroundColor: "#f9f8ee",
        }}
      >
        <Typography variant="h5" gutterBottom>
          New Note
        </Typography>
        {isError && (
          <Typography color="error" className={errClass}>
            {error?.data?.message}
          </Typography>
        )}
        <form onSubmit={onSaveNoteClicked}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              autoComplete="off"
              value={title}
              onChange={onTitleChanged}
              required
              error={!title}
              helperText={!title ? "Title is required" : ""}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              id="text"
              name="text"
              label="Text"
              type="text"
              multiline
              rows={4}
              value={text}
              onChange={onTextChanged}
              required
              error={!text}
              helperText={!text ? "Text is required" : ""}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="userId">Assigned To</InputLabel>
            <Select
              id="userId"
              name="userId"
              value={userId}
              onChange={onUserIdChanged}
              required
              error={!userId}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
            {!userId && <FormHelperText>Select a user</FormHelperText>}
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!canSave}
            startIcon={<FontAwesomeIcon icon={faSave} />}
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default NewNoteForm;
