import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: '"Noto Sans KR", sans-serif',
      },
    }}
  >
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
