import React, { useState, useEffect } from "react";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(user.roles[0] || "Employee"); // Assuming at least one role exists
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
    if (name === "active") setActive(checked);
  };

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles: [role],
        active,
      });
    } else {
      await updateUser({ id: user.id, username, roles: [role], active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const roleOptions = Object.values(ROLES).map((role) => (
    <FormControlLabel
      key={role}
      value={role}
      control={<Radio />}
      label={role}
    />
  ));

  let canSave = password
    ? [validUsername, validPassword, role].every(Boolean)
    : [validUsername, role].every(Boolean);

  return (
    <div className="form-container">
      <Paper
        sx={{
          backgroundColor: "transparent",
          padding: 3,
          width: "70%",
          margin: "auto",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Edit User
        </Typography>
        {isError ||
          (isDelError && (
            <Typography color="error">
              {error?.data?.message || delerror?.data?.message}
            </Typography>
          ))}
        <form onSubmit={(e) => e.preventDefault()} className="form-container">
          <FormControl fullWidth margin="normal" error={!validUsername}>
            <TextField
              id="username"
              name="username"
              label="Username"
              type="text"
              value={username}
              onChange={handleChange}
              autoComplete="off"
              placeholder="Username"
            />
            {!validUsername && (
              <FormHelperText>Username must be 3-20 letters</FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            error={password && !validPassword}
          >
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              helperText={
                password && !validPassword
                  ? "Password must be 4-12 characters, including !@#$%"
                  : "Leave empty to keep the current password"
              }
            />
            {password && !validPassword && (
              <FormHelperText>
                Password must be 4-12 characters, including !@#$%
              </FormHelperText>
            )}
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                checked={active}
                onChange={handleChange}
                name="active"
              />
            }
            label="Active"
          />

          <FormControl fullWidth margin="normal">
            <FormLabel>Assigned Role</FormLabel>
            <RadioGroup name="role" value={role} onChange={handleChange}>
              {roleOptions}
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={onSaveUserClicked}
            disabled={!canSave}
            startIcon={<FontAwesomeIcon icon={faSave} />}
            sx={{ marginTop: 2, marginRight: 1 }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onDeleteUserClicked}
            startIcon={<FontAwesomeIcon icon={faTrashCan} />}
            sx={{ marginTop: 2 }}
          >
            Delete
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default EditUserForm;
