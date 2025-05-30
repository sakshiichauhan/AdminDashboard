import { Routes, Route } from "react-router-dom";


import NotFound from "@/pages/CMS/NotFount";
import VideoLibrary from "@/pages/CMS/VideoLibrary";
import { CmsInsights } from "@/pages/CMS/CmsInsights";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CmsInsights />} />
      <Route path="/insights" element={<CmsInsights />} />
      <Route path="/videos" element={<VideoLibrary />} />
      {/* <Route path="/explorers" element={<Index />} />
      <Route path="/coaches" element={<Index />} />
      <Route path="/organisations" element={<Index />} />
      <Route path="/coaches-profiles" element={<Index />} />
      <Route path="/organisations-profiles" element={<Index />} />
      <Route path="/map-listings" element={<Index />} />
      <Route path="/forms-data" element={<Index />} />
      <Route path="/assessments" element={<Index />} />
      <Route path="/sessions" element={<Index />} />
      <Route path="/sessions-pool" element={<Index />} />
      <Route path="/masterclasses" element={<Index />} />
      <Route path="/learning" element={<Index />} />
      <Route path="/access-code" element={<Index />} />
      <Route path="/videos" element={<VideoLibrary />} />
      <Route path="/news" element={<Index />} />
      <Route path="/testimonials" element={<Index />} />
      <Route path="/libraries" element={<Index />} />
      <Route path="/surveys" element={<Index />} />
      <Route path="/help" element={<Index />} />
      <Route path="/faqs" element={<Index />} />
      <Route path="/team" element={<Index />} />
      <Route path="/callback" element={<Index />} />
      <Route path="/chat-requests" element={<Index />} />
      <Route path="/career-enquiries" element={<Index />} />
      <Route path="/careerlabs" element={<Index />} />
      <Route path="/partners" element={<Index />} />
      <Route path="/reviews" element={<Index />} />
      <Route path="/feedbacks" element={<Index />} />
      <Route path="/problems" element={<Index />} />
      <Route path="/bugs" element={<Index />} />
      <Route path="/abuses" element={<Index />} />
      <Route path="/notifications-web" element={<Index />} />
      <Route path="/notifications-whatsapp" element={<Index />} />
      <Route path="/notifications-email" element={<Index />} /> */}
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;