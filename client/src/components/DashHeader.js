import { Link } from "react-router-dom";
// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, styled } from "@mui/material";
import { Add, Notes, Login } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import Groups2Icon from "@mui/icons-material/Groups2";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DashboardIcon from "@mui/icons-material/Dashboard";

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

const DashHeader = () => {
  const navigate = useNavigate();
  const onGoHomeClicked = () => navigate("/dash");

  const theme = useTheme();
  const content = (
    <HeaderContainer position="sticky" className="header-container">
      <Toolbar className="header-container">
        <h1 className="header-title" href="/">
          <FilterVintageIcon onClick={onGoHomeClicked} />
          Designers Hub
        </h1>
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
          </StyledIconButton>
        </IconGroup>
      </Toolbar>
    </HeaderContainer>
  );

  return content;
};
export default DashHeader;
