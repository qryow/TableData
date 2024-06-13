import DetailPage from "@/pages/DetailPage";
import HomePage from "@/pages/HomePage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<DetailPage />} />
    </Routes>
  );
};

export default MainRoutes;
