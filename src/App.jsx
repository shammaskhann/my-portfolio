import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Toolkit from "./components/Toolkit";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import data from "./data/portfolio";

export default function Portfolio() {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header data={data} />
      <main id="main">
        <Hero data={data} />
        <Work data={data} />
        <Toolkit />
        <Experience data={data} />
        <Education data={data} />
        <Contact data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
