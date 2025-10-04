import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { navAsideMenusMentee } from "@/app/config/nav";
import { GlobalLayout } from "@/app/layouts/GlobalLayout";
import { NavTopLayout } from "@/app/layouts/NavTopLayout";
import { RegisterLayout } from "@/app/layouts/RegisterLayout";
import { RootLayout } from "@/app/layouts/RootLayout";

import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/auth/SignInPage";
import MenteeDashboardPage from "@/pages/mentee/MenteeDashboardPage";
import MenteeFeedbackPage from "@/pages/mentee/MenteeFeedbackPage";
import MenteeSearchMentorPage from "@/pages/mentee/MenteeSearchMentorPage";
import MenteeSettingsPage from "@/pages/mentee/MenteeSettingsPage";
import ApplicationDetailPage from "@/pages/mentee/applications/ApplicationDetailPage";
import DocumentDiffPage from "@/pages/mentee/applications/DocumentDiffPage";

const routes = createRoutesFromElements(
    <Fragment>
        <Route path="/" element={<GlobalLayout />}>
            <Route path="/" element={<NavTopLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="/auth">
                <Route path="signin" element={<SignInPage />} />
                <Route path="role" />
                <Route path="register" element={<RegisterLayout />}></Route>
            </Route>

            <Route path="/mentor">
                <Route path="dashboard"></Route>
            </Route>

            <Route path="/mentee" element={<RootLayout navAsideMenus={navAsideMenusMentee} />}>
                <Route path="dashboard" element={<MenteeDashboardPage />} />
                <Route path="search" element={<MenteeSearchMentorPage />} />
                <Route path="settings" element={<MenteeSettingsPage />} />

                <Route path="applications"></Route>
                <Route path="applications/:applicationId">
                    <Route index></Route>
                    <Route path="resumes" element={<ApplicationDetailPage />} />
                    <Route path="coverletters" element={<ApplicationDetailPage />} />
                    <Route path="portfolios" element={<ApplicationDetailPage />} />

                    <Route path="diff" element={<DocumentDiffPage />} />
                </Route>

                <Route path="feedback/:id" element={<MenteeFeedbackPage />} />
            </Route>
        </Route>
    </Fragment>,
);

export const router = createBrowserRouter(routes);
