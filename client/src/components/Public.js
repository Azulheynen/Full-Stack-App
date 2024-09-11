import { Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import StyleIcon from "@mui/icons-material/Style";

const Public = () => {
  const navigate = useNavigate();
  const onGoHomeClicked = () => navigate("/dash");

  const content = (
    <div className="public-container">
      <section className="poster">
        <header className="poster-header">
          <h1>
            Welcome to{" "}
            <span className="nowrap">Artful Alchemists Central!</span>
          </h1>
        </header>
        <main className="public__main">
          <p>
            Situated in the creative heartbeat of Buenos Aires, Artful
            Alchemists is your ultimate hub for innovative design solutions and
            user-centric experiences. Our talented team of graphic designers and
            UI/UX experts is here to transform your visions into visually
            stunning realities.
          </p>
          <address className="public__addr">
            Design Central
            <br />
            5678 Visionary Blvd
            <br />
            Buenos Aires, CF, 1280
            <br />
            {/* <a href="tel:+[000-800-999]">Connect with us!</a> */}
          </address>
          <br />
        </main>
        <footer>
          <SwitchAccessShortcutIcon
            className="home-icon"
            style={{ fontSize: "28px" }}
            align="center"
          ></SwitchAccessShortcutIcon>
          <Link className="footer-label" href="/dash">
            Enter the Designer's Notes Studio
          </Link>
        </footer>
      </section>
    </div>
  );

  return content;
};

export default Public;
