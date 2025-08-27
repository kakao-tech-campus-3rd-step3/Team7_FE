import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/app/styles/main.css";

import App from "@/App";
import { isMSWEnabled, mswWorker } from "@/__mocks__/msw";

const REACT_ROOT_ELEMENT = document.getElementById("root") as HTMLElement;

if (isMSWEnabled) {
    mswWorker.start().then(() => {
        createRoot(REACT_ROOT_ELEMENT).render(
            <StrictMode>
                <App />
            </StrictMode>,
        );
    });
} else {
    createRoot(REACT_ROOT_ELEMENT).render(<App />);
}
