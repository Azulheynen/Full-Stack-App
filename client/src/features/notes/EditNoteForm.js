import React, { useState, useEffect } from "react";
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditNoteForm = ({ note, users }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();
  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();
  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted(e.target.checked);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async () => {
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => (
    <MenuItem key={user.id} value={user.id}>
      {user.username}
    </MenuItem>
  ));

  const errContent = error?.data?.message || delerror?.data?.message;

  return (
    <div className="form-container">
      <Paper
        sx={{
          padding: 3,
          width: "70%",
          margin: "auto",
          backgroundColor: "#f9f8ee",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Edit Note #{note.ticket}
        </Typography>
        {isError || isDelError ? (
          <Typography color="error">{errContent}</Typography>
        ) : null}

        <form onSubmit={(e) => e.preventDefault()}>
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

          <FormControl margin="normal">
            <FormControlLabel
              control={
                <Checkbox
                  id="completed"
                  name="completed"
                  checked={completed}
                  onChange={onCompletedChanged}
                />
              }
              label="Work Complete"
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
              {options}
            </Select>
            {!userId && <FormHelperText>Select a user</FormHelperText>}
          </FormControl>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Created: {created}
          </Typography>
          <Typography variant="body2">Updated: {updated}</Typography>

          <div style={{ marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
              startIcon={<FontAwesomeIcon icon={faSave} />}
              sx={{ marginRight: 1 }}
            >
              Save
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteNoteClicked}
              startIcon={<FontAwesomeIcon icon={faTrashCan} />}
            >
              Delete
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default EditNoteForm;
