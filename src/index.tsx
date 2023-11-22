import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./components/app/app";
import "./styles/index.css";
import "../public/fonts/fonts.css";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";

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
