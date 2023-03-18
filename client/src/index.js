import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
