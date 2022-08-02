import React from "react";

import("qc/button").then((res) => {
  console.log({ res });
});

const RemoteButton = React.lazy(() =>
  import("qc/button").then((module) => ({ default: module.Button }))
);

export const App = () => {
  return (
    <div>
      <h1>Portal</h1>
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
};
