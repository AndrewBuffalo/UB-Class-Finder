import React, { useState } from "react";

import Navbar from "./components/Navbar.js";
import Explainer from "./components/Explainer.js";
import Footer from "./components/Footer.js";
import { CampusSelection } from "./components/CampusSelection.js";

function App() {
  return (
    <div>
      <Navbar />
      <Explainer />
      <CampusSelection />
      <Footer />
    </div>
  );
}

export default App;
