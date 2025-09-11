import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { setupStore } from "./processes/redux/store/store";

import { App } from "./app";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore}>
      <App />
    </Provider>
  </StrictMode>
);
