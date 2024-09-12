import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { FcConferenceCall } from "react-icons/fc";
import { FcKindle } from "react-icons/fc";
import { FcFilingCabinet } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { PiArrowFatLinesLeftDuotone } from "react-icons/pi";

const Welcome = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const navigate = useNavigate();

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
        <p className="public-text">Designers Hub</p>
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
        </button>

        <button
          onClick={onNewNoteClicked}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FcKindle className="menu-icons" />
        </button>
        <button
          onClick={onNotesClicked}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <FcFilingCabinet className="menu-icons" />
        </button>
      </div>
    </div>
  );
};

export default Welcome;
