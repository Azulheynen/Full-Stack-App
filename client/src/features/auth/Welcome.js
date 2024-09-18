import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../index.css";
import { FcConferenceCall } from "react-icons/fc";
import { FcKindle } from "react-icons/fc";
import { FcFilingCabinet } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const Welcome = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const navigate = useNavigate();
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const { username, isManager, isAdmin } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurred(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const onNewUserClicked = () => navigate("/dash/users/new");
  const onNewNoteClicked = () => navigate("/dash/notes/new");
  const onUsersClicked = () => navigate("/dash/users");
  const onNotesClicked = () => navigate("/dash/notes/new");

  return (
    <div className={`welcome ${isBlurred ? "blurred" : ""}`}>
      <h1 className="breathe-animation">
        <span>Notes & Tasks</span>
        <p className="public-text">Welcome {username}!</p>
      </h1>
      {/* <div className="wrap">
        <span className="left">Designer's</span>
        <span className="centre">Notes and Tasks</span>
        <span className="right">Dashboard</span>
      </div> */}
      <p className="public-text">{today}</p>
      <div className="welcome-container">
        <button
          onClick={onNewUserClicked}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FcServices className="menu-icons" />
          <h3>New User</h3>
        </button>
        <button
          onClick={onUsersClicked}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <FcConferenceCall className="menu-icons" />
          <h3>Users</h3>
        </button>

        <button
          onClick={onNewNoteClicked}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FcKindle className="menu-icons" />
          <h3>New Note</h3>
        </button>
        <button
          onClick={onNotesClicked}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FcFilingCabinet className="menu-icons" />
          <h3>Notes</h3>
        </button>

        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
          }}
          onClick={() => sendLogout()}
        >
          <FiLogOut className="menu-icons" />
          <h3>Logout</h3>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
