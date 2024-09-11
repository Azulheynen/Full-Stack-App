import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Public from "../../components/Public";

const Welcome = () => {
  const [isBlurred, setIsBlurred] = useState(false);

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

  return (
    <div className="welcome-container">
      <div className={`background-image ${isBlurred ? "blurred" : ""}`}></div>
      <section className="welcome">
        <p>{today}</p>
        <h1 className="rainbow-text">Welcome!</h1>
        <p>
          <Link className="letters" to="/dash/notes">
            View techNotes
          </Link>
        </p>
        <p>
          <Link className="letters" to="/dash/notes/new">
            Add new note
          </Link>
        </p>
        <p>
          <Link className="letters" to="/dash/users">
            View User Settings
          </Link>
        </p>
        <p>
          <Link className="letters" to="/dash/users/new">
            Add new User
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Welcome;
