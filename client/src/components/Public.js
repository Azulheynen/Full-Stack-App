import { Link, useNavigate } from "react-router-dom";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";
import StyleIcon from "@mui/icons-material/Style";
import "../img/home.png";

const Public = () => {
  const navigate = useNavigate();

  // Click handler for image/icon
  const onGoHomeClicked = () => navigate("/dash");

  const content = (
    <div className="public-container">
      <div class="stars">
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
        <div class="star"></div>
      </div>
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
          </address>

          {/* Link to enter the Studio */}
          <Link className="footer-label">
            Enter the Designer's Notes Studio
          </Link>

          <div className="animated-icon-container" onClick={onGoHomeClicked}>
            <img
              src={require("../img/home.png")}
              alt="Enter the Designer's Notes"
              className="animated-icon"
            />
          </div>
        </main>
      </section>
    </div>
  );

  return content;
};

export default Public;
