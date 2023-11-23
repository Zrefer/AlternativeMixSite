import "./styles/index.css";
import "../public/fonts/fonts.css";

import App from "./components/app/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./services/store";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// TODO Change refs path to @
// TODO Change some classNames to clx package
