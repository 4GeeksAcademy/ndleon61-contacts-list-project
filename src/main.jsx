import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { ContextProvider } from "./store/Context";
import '../src/index.css'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 <React.StrictMode>
    < ContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ContextProvider>
</React.StrictMode>
);
