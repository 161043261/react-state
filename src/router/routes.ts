import type { FunctionComponent } from "react";
import type { RouteObject } from "react-router";

type DynamicImport = () => Promise<{ default: FunctionComponent }>;

const withLazy = (load: DynamicImport) => {
  return async () => {
    const { default: Component } = await load();
    return { Component };
  };
};

const routes: RouteObject[] = [
  {
    path: "jotai",
    lazy: withLazy(() => import("@/pages/jotai")),
  },
  {
    path: "mobx",
    lazy: withLazy(() => import("@/pages/mobx")),
  },
  {
    path: "redux",
    lazy: withLazy(() => import("@/pages/redux")),
  },
  {
    path: "zustand",
    lazy: withLazy(() => import("@/pages/zustand")),
  },
];

export default routes;
