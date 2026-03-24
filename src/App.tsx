import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SocialActivities from "./pages/SocialActivities";
import VadansList from "./pages/VadansList";
import Gallery from "./pages/Gallery";
import ContactUs from "./pages/ContactUs";
import Registration from "./pages/Registration";
import OurJourney from "./pages/OurJourney";
import NotFound from "./pages/NotFound";
import SocialDock from "./components/SocialDock";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <SocialDock />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<OurJourney />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/social-activities" element={<SocialActivities />} />
          <Route path="/vadans" element={<VadansList />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
