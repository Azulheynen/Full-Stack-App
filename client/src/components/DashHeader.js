import React from "react";
import { AppBar, Toolbar, Typography, IconButton, styled } from "@mui/material";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import Groups2Icon from "@mui/icons-material/Groups2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

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

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  padding: "0 1em",
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[4],
}));

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
  transition: "color 0.3s ease",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));

const DashHeader = ({ user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const handleNavigate = (route) => () => {
    navigate(route);
  };

  // const username = useSelector((state) => state.auth.username);
  // const roles = useSelector((state) => state.auth.roles);
  const { username, isManager, isAdmin, status } = useAuth();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  /* Conditionally Buttons */

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "header-container";
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <StyledIconButton>
          <Groups2Icon
            fontSize="large"
            onClick={handleNavigate("/dash/users")}
          />
        </StyledIconButton>
      );
    }
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <StyledIconButton>
        <NoteAddIcon
          fontSize="large"
          onClick={handleNavigate("/dash/notes/new")}
        />
      </StyledIconButton>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <StyledIconButton>
        <PersonAddIcon
          fontSize="large"
          onClick={handleNavigate("/dash/users/new")}
        />
      </StyledIconButton>
    );
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    <StyledIconButton>
      <AutoStoriesIcon
        fontSize="large"
        onClick={handleNavigate("/dash/notes")}
      />
    </StyledIconButton>;
  }

  let homeButton = null;
  if (
    !pathname.includes(
      "/dash/users" ||
        "/dash/notes" ||
        "/dash/users/new" ||
        "/dash/notes/new" ||
        "/login"
    )
  ) {
    <StyledIconButton>
      <DashboardIcon fontSize="large" onClick={handleNavigate("/dash")} />
    </StyledIconButton>;
  }

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        <StyledIconButton>
          <LoginIcon fontSize="large" onClick={handleNavigate("/login")} />
        </StyledIconButton>
      </>
    );
  }

  const content = (
    <HeaderContainer position="sticky" className="header-container">
      <Toolbar className="header-container">
        <h1 className="header-title" href="/">
          Designers Hub
        </h1>
        <h3>
          <p>Current User: "{username}"</p>
          <p>Status:{status}</p>
        </h3>
        <IconGroup className="icon-group">{buttonContent}</IconGroup>
      </Toolbar>
    </HeaderContainer>
  );

  return content;
};
export default DashHeader;
