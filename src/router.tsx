import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { Fragment } from "react/jsx-runtime";

import { GlobalLayout } from "@/app/layouts/GlobalLayout";
import { NavTopLayout } from "@/app/layouts/NavTopLayout";
import { RegisterLayout } from "@/app/layouts/RegisterLayout";
import { RootLayout } from "@/app/layouts/RootLayout";

import { NavAsideMenusByRole } from "@/features/authentication/components/NavAsideMenusByRole";

import HomePage from "@/pages/HomePage";
import RedirectPage from "@/pages/auth/RedirectPage";
import RegisterMentee from "@/pages/auth/RegisterMentee";
import RegisterMentor from "@/pages/auth/RegisterMentor";
import RolePage from "@/pages/auth/RolePage";
import SignInPage from "@/pages/auth/SignInPage";
import MenteeDashboardPage from "@/pages/mentee/MenteeDashboardPage";
import MenteeDetailMentorPage from "@/pages/mentee/MenteeDetailMentorPage";
import MenteeFeedbackPage from "@/pages/mentee/MenteeFeedbackPage";
import MenteeSearchMentorPage from "@/pages/mentee/MenteeSearchMentorPage";
import MenteeSettingsPage from "@/pages/mentee/MenteeSettingsPage";
import ApplicationDetailPage from "@/pages/mentee/applications/ApplicationDetailPage";
import DocumentDiffPage from "@/pages/mentee/applications/DocumentDiffPage";
import NewCoverLetterPage from "@/pages/mentee/applications/NewCoverLetterPage";
import NewPortfolioPage from "@/pages/mentee/applications/NewPortfolioPage";
import NewResumePage from "@/pages/mentee/applications/NewResumePage";
import MentorDashboardPage from "@/pages/mentor/MentorDashboardPage";
import MentorSettingsPage from "@/pages/mentor/MentorSettingsPage";

const routes = createRoutesFromElements(
    <Fragment>
        <Route path="/" element={<GlobalLayout />}>
            <Route path="/" element={<NavTopLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>

            <Route path="/auth">
                <Route path="signin" element={<SignInPage />} />
                <Route path="redirect" element={<RedirectPage />} />
                <Route path="role" element={<RolePage />}></Route>

                <Route path="register" element={<RegisterLayout />}>
                    <Route path="mentor" element={<RegisterMentor />} />
                    <Route path="mentee" element={<RegisterMentee />} />
                </Route>
            </Route>

            <Route path="/mentor" element={<RootLayout navAside={<NavAsideMenusByRole />} />}>
                <Route path="dashboard" element={<MentorDashboardPage />} />
                <Route path="settings" element={<MentorSettingsPage />} />
            </Route>

            <Route path="/mentee" element={<RootLayout navAside={<NavAsideMenusByRole />} />}>
                <Route path="dashboard" element={<MenteeDashboardPage />} />
                <Route path="search" element={<MenteeSearchMentorPage />} />
                <Route path="mentors/:id" element={<MenteeDetailMentorPage />} />
                <Route path="settings" element={<MenteeSettingsPage />} />
                <Route path="applications"></Route>
                <Route path="resumes/new" element={<NewResumePage />} />
                <Route path="coverletters/new" element={<NewCoverLetterPage />} />
                <Route path="portfolios/new" element={<NewPortfolioPage />} />

                <Route path="applications/:applicationId">
                    <Route index element={<ApplicationDetailPage />} />
                    <Route path="resumes" element={<ApplicationDetailPage />} />
                    <Route path="coverletters" element={<ApplicationDetailPage />} />
                    <Route path="portfolios" element={<ApplicationDetailPage />} />

                    <Route path="resumes/new" element={<NewResumePage />} />
                    <Route path="coverletters/new" element={<NewCoverLetterPage />} />
                    <Route path="portfolios/new" element={<NewPortfolioPage />} />

                    <Route path="diff" element={<DocumentDiffPage />} />
                </Route>
                <Route path="feedback/:id" element={<MenteeFeedbackPage />} />
            </Route>
        </Route>
    </Fragment>,
);

export const router = createBrowserRouter(routes);
