import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1 class="rainbow-text">Welcome!</h1>
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
  );

  return content;
};
export default Welcome;
