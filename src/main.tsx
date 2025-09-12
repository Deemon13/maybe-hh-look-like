import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createTheme, MantineProvider } from "@mantine/core";

import { setupStore } from "./processes/redux/store/store";

import { App } from "./app";

const theme = createTheme({});

import "@mantine/core/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={setupStore}>
      <MantineProvider theme={theme}>
        <App />
      </MantineProvider>
    </Provider>
  </StrictMode>
);
