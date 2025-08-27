import { http } from "msw";

export const AuthHandlers = [http.get("/auth", () => {})];
