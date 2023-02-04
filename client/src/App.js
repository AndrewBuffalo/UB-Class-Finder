import React from "react";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { CampusSelection } from "./components/campusSelection.js";

function App() {
  return (
    <div>
      <Header />
      <CampusSelection />
      <Footer />
    </div>
  );
}

export default App;
