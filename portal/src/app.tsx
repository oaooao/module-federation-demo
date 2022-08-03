import React from "react";
import { HashRouter, Outlet, Route, Routes, useParams } from "react-router-dom";

import("qc/button").then((res) => {
  console.log({ res });
});

const RemoteButton = React.lazy(() =>
  import("qc/button").then((module) => ({ default: module.Button }))
);

const A = (props: any) => {
  return <div>
    <h1>A</h1>
    <Outlet />
  </div>
}

const B = () => {
  return <h1>B</h1>
}

const Teams = () => {
  return <div>
    <h1>Teams</h1>
    <Outlet />
  </div>
}

const Team = () => {
  const params = useParams();

  return <h1>Team {params.teamId}</h1>
}

const NewTeamForm = () => {
  return <h1>NewTeamForm</h1>
}

const LeagueStandings = () => {
  return <h1>LeagueStandings</h1>
}

export const App = () => {
  return (
    <div>
      <h1>Portal</h1>
      <HashRouter>
        <Routes>
          <Route path="/" element={<A />}>
            <Route index element={<B />} />
            <Route path="teams" element={<Teams />}>
              <Route path=":teamId" element={<Team />} />
              <Route path="new" element={<NewTeamForm />} />
              <Route index element={<LeagueStandings />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
};
