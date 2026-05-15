import AboutMe from "./components/AboutMe";
import Achievement from "./components/Achivement";
import Contact from "./components/contact";
import Header from "./components/header";
import Hero from "./components/Hero";
import MyProject from "./components/MyProject";
import MySkills from "./components/MySkills";
import Timeline from "./components/Timeline";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <AboutMe />
      <div className="max-md:h-100"></div>
      <MySkills />
      <div className="max-md:h-100"></div>
      <MyProject />
      <div className="max-md:h-100"></div>
      <Timeline />
      <div className="max-md:h-100"></div>
      <Achievement />
      <div className="max-md:h-100"></div>
      <Contact />
    </>
  );
}

export default App;
