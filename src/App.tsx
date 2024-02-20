import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import Router from "./routers";

const App: React.FC = () => {
  // i18next.changeLanguage("ko");
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
