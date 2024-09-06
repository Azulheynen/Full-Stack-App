import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap"> Artful Alchemists Central!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Situated in the creative heartbeat of Buenos Aires, Artful Alchemists
          is your ultimate hub for innovative design solutions and user-centric
          experiences. Our talented team of graphic designers and UI/UX experts
          is here to transform your visions into visually stunning realities.
        </p>
        <address className="public__addr">
          Design Central
          <br />
          5678 Visionary Blvd
          <br />
          Buenos Aires, CF, 1280
          <br />
          <a href="tel:+[000-800-999]">Connect with us: [Phone Number]</a>
        </address>
        <br />
        <p>Curated by: All</p>
      </main>
      <footer>
        <Link to="/login">Enter the Design Studio</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
