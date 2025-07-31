import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AuthenticationLoginRegister from "pages/authentication-login-register";
import CardEditor from "pages/card-editor";
import DashboardMainWorkspace from "pages/dashboard-main-workspace";
import WhiteboardInterface from "pages/whiteboard-interface";
import ProjectDetailView from "pages/project-detail-view";
import ProfileAndSettings from "pages/profile-and-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<DashboardMainWorkspace />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/card-editor" element={<CardEditor />} />
        <Route path="/dashboard-main-workspace" element={<DashboardMainWorkspace />} />
        <Route path="/whiteboard-interface" element={<WhiteboardInterface />} />
        <Route path="/project-detail-view" element={<ProjectDetailView />} />
        <Route path="/profile-and-settings" element={<ProfileAndSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;