// src/components/Login.js
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import useConfig from "../../hooks/useConfig";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: theme.palette.background.paper,
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 600,
}));

const ErrorText = styled(Alert)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));

const Login = () => {
  const userRef = useRef(null);
  const errRef = useRef(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { config, loading: configLoading } = useConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (configLoading) {
      setErrMsg("Config is still loading, please wait.");
      return;
    }

    if (!config) {
      setErrMsg("Config not available. Please try again later.");
      return;
    }
    // if (configLoading || !config) return;

    try {
      const { accessToken } = await login({
        username,
        password,
        credentials: config,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      // errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  if (isLoading || configLoading) return <Typography>Loading...</Typography>;

  return (
    <StyledContainer>
      <Typography variant="h3" component="h1" gutterBottom>
        Employee Login
      </Typography>
      {errMsg && (
        <ErrorText ref={errRef} severity="error" aria-live="assertive">
          {errMsg}
        </ErrorText>
      )}
      <FormBox component="form" onSubmit={handleSubmit}>
        <TextField
          label="Username"
          id="username"
          type="text"
          ref={userRef}
          value={username}
          onChange={handleUserInput}
          autoComplete="off"
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          value={password}
          onChange={handlePwdInput}
          required
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          // onClick={handleSubmit}
        >
          Sign In
        </SubmitButton>
      </FormBox>
      <Box mt={2}>
        <Link to="/">Back to Home</Link>
      </Box>
    </StyledContainer>
  );
};

export default Login;
