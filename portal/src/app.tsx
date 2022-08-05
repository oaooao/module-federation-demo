import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import "./app.css";
import { Button } from "qc/button";
import { QCRouter } from "qc/router";
import React from "react";

// const RemoteButton = React.lazy(() =>
//   import("qc/button").then((module) => ({ default: module.Button }))
// );

const B = () => {
  return <h1>B</h1>;
};

export const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<B />} />
          <Route path="qc">
              <QCRouter />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
};
