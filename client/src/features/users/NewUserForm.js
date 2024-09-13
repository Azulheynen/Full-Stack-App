import React, { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
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
  FormHelperText,
  Paper,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState("Employee");

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRole("Employee");
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
  };

  const canSave =
    [validUsername, validPassword, role].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles: [role] });
    }
  };

  const roleOptions = Object.values(ROLES).map((role) => (
    <FormControlLabel
      key={role}
      value={role}
      control={<Radio />}
      label={role}
    />
  ));

  return (
    <div className="form-container">
      <Paper
        sx={{
          padding: 3,
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          backgroundColor: "#f9f8ee",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{
            textAlign: "center",
            fontSize: "2em",
          }}
        >
          New User
        </Typography>
        {isError && (
          <Typography color="error">{error?.data?.message}</Typography>
        )}
        <form
          onSubmit={onSaveUserClicked}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
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

          <FormControl fullWidth margin="normal" error={!validPassword}>
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            {!validPassword && (
              <FormHelperText>
                Password must be 4-12 characters, including !@#$%
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <FormLabel>Assigned Role</FormLabel>
            <RadioGroup name="role" value={role} onChange={handleChange}>
              {roleOptions}
            </RadioGroup>
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

export default NewUserForm;
