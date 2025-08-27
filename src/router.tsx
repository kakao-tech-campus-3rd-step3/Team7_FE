import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { GlobalLayout } from "@/app/layouts/GlobalLayout";

import HomePage from "@/pages/HomePage";

const routes = createRoutesFromElements(
    <Fragment>
        <Route path="/" element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />} />
        </Route>
    </Fragment>,
);

export const router = createBrowserRouter(routes);
