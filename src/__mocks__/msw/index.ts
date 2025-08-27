import { AuthHandlers } from "@/__mocks__/msw/AuthHandlers";
import { setupWorker } from "msw/browser";

const rootHandlers = [...AuthHandlers];

export const mswWorker = setupWorker(...rootHandlers);

export const isMSWEnabled =
    process.env.NODE_ENV === "development" && import.meta.env.VITE_MSW_ENABLED === "true";
