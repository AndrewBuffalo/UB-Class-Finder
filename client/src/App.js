import React from "react";

import Navbar from "./Navbar.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";

function App() {
  let component;
  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/about":
      component = <About />;
      break;
  }

  return (
    <div className="dark:bg-slate-800">
      <Navbar />
      {component}
    </div>
  );
}

export default App;
