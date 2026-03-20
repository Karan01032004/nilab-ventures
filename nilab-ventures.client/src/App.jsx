import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./poweradmin/context/ThemeContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { HelmetProvider } from "react-helmet-async";
// ✅ Structure ke mutabiq imports (Folder name includes .jsx)
import Home from "./pages/Home.jsx/Home";
import Sitemap from "./pages/Sitemap.jsx/Sitemap";
import NotFound from "./pages/NotFound/NotFound";
import Form from "./pages/form/Fundingform";
import ScrollToHash from "./componants/utility/ScrollToHash/ScrollToHash";
import SignIn from "./poweradmin/pages/SignIn/SignIn";
import Dashboard from "./poweradmin/pages/Dashboard/Dashboard";
import InquiryTable from "./poweradmin/pages/InquiryManagement/InquiryTable";
import InquiryTab from "./poweradmin/pages/InquiryManagement/inquiryattended";
import InquiryDetails from "./poweradmin/pages/InquiryManagement/InquiryDetails";
import AppLayout from "./poweradmin/layout/AppLayout";
function App() {
    return (

        <ThemeProvider>
            <BrowserRouter basename="/">
            {/* ScrollToHash yahan add kiya hai taake sitemap links jump karein */}
            <ScrollToHash />
            <HelmetProvider>
                <Routes>
                    <Route path="poweradmin/signin" element={<SignIn />} />
                    {/* Main Home Route */}
                    <Route
                        path="/poweradmin"
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="inquiry" element={<InquiryTable />} />
                            <Route path="attended-inquiry" element={<InquiryTab />} />
                        <Route path="view-inquiry/:id" element={<InquiryDetails />} />
                    </Route>
                <Route path="/" element={<Home />} />

                {/* Sitemap Route */}
                <Route path="/sitemap" element={<Sitemap />} />
                        <Route path="/funding-application" element={<Form />} />

                {/* 404 Catch-all Route */}
                        <Route path="*" element={<NotFound />} />

                </Routes>
                </HelmetProvider>
            </BrowserRouter>

            </ThemeProvider>
    );
}

export default App;