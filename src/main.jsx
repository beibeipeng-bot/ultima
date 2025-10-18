import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 如果你用了 Tailwind 或自定义样式

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
