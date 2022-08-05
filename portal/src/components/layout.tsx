import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./header";
import { Menu } from "./menu";

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />

      <main css={{ flex: 1, display: "flex" }}>
        <Menu />
        <section css={{ flex: 1 }}>
          <Outlet />
        </section>
      </main>
    </main>
  );
};
