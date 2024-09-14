import { Link } from "react-router-dom";
// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, styled } from "@mui/material";
import { Add, Notes, Login } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import Groups2Icon from "@mui/icons-material/Groups2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import LoginIcon from "@mui/icons-material/Login";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-7px);
  }
`;

// Header container styling
const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default, // Use theme background color
  color: theme.palette.text.primary,
  padding: "0 1em",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[4],
}));

// Title styling with bounce animation
const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.primary,
  fontSize: "2rem",
  fontWeight: "bold",
  animation: `${bounce} 2s infinite`, // Bounce animation
}));

const IconGroup = styled("div")({
  display: "flex",
  gap: "1em",
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  transition: "color 0.3s ease", // Smooth transition for color
  "&:hover": {
    color: theme.palette.secondary.main, // Color change on hover
  },
}));

const DashHeader = ({ user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const onGoHomeClicked = () => navigate("/dash");

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <faRightFromBracket />
    </button>
  );

  const content = (
    <HeaderContainer position="sticky" className="header-container">
      <Toolbar className="header-container">
        <h1 className="header-title" href="/">
          <FilterVintageIcon onClick={onGoHomeClicked} />
          Designers Hub
        </h1>
        <h3>
          <p>Current User:{user}</p>
          <p>Status:{user}</p>
        </h3>
        <IconGroup className="icon-group">
          <StyledIconButton href="/dash">
            <DashboardIcon fontSize="large" />
          </StyledIconButton>
          <StyledIconButton href="/dash/notes/new">
            <NoteAddIcon fontSize="large" />
          </StyledIconButton>
          <StyledIconButton href="/dash/notes">
            <AutoStoriesIcon fontSize="large" />
          </StyledIconButton>
          <StyledIconButton href="/dash/users">
            <Groups2Icon fontSize="large" />
          </StyledIconButton>
          <StyledIconButton href="/dash/users/new">
            <PersonAddIcon fontSize="large" href="/dash/users" />
          </StyledIconButton>{" "}
          <StyledIconButton
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
          >
            <LoginIcon href="/" />
          </StyledIconButton>
        </IconGroup>
      </Toolbar>
    </HeaderContainer>
  );

  return content;
};
export default DashHeader;
