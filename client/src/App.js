import "./App.css";
import React from "react";

import PageHeader from "./components/PageHeader.js";
import Explainer from "./components/Explainer.js";
import { CampusSelection } from "./components/campusSelection.js";

function App() {
  return (
    <div>
      <PageHeader />
      <CampusSelection />
      <Explainer />
    </div>
  );
}

export default App;
