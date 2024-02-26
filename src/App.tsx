import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import Router from "./routers";
import { useLocalStorage } from "./stores/localStorage";

const App: React.FC = () => {
  const { locale } = useLocalStorage((state) => state);
  useEffect(() => {
    i18next.changeLanguage(locale);
  }, [locale]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
