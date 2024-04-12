import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./App.css";
import Router from "./routers";
import { useLocalStorage } from "./stores/localStorage";
import { Spin } from "antd";
import { useCommonState } from "./stores/commonStorage";

const AppMain: React.FC = () => {
  const { locale } = useLocalStorage((state) => state);
  const { loading } = useCommonState((state) => state);
  useEffect(() => {
    i18next.changeLanguage(locale);
  }, [locale]);

  return (
    <div className="relative">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      {loading && (
        <div
          style={{ zIndex: 100000000000 }}
          className="absolute flex justify-center items-center bg-opacity-40 top-0 left-0 w-full h-full  bg-darkNight400"
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default AppMain;
