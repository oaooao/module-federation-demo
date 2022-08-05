import React from "react";
import { Route } from "react-router-dom";

export const QCRouter = () => {
  return (
    <Route>
      <Route path="kpi" element={<h1>KPI 页面</h1>} />
      <Route path="target" element={<h1>对象 页面</h1>} />
    </Route>
  );
};
