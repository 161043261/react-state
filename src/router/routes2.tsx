import { lazy, Suspense, type FunctionComponent } from "react";
import type { RouteObject } from "react-router";

type DynamicImport = () => Promise<{ default: FunctionComponent }>;

const withLazy = (load: DynamicImport) => {
  const LazyComponent = lazy(load);
  return (
    <Suspense fallback="Loading...">
      <LazyComponent />
    </Suspense>
  );
};

const jotaiPage = withLazy(() => import("@/pages/jotai"));
const mobXPage = withLazy(() => import("@/pages/mobx"));
const reduxPage = withLazy(() => import("@/pages/redux"));
const zustandPage = withLazy(() => import("@/pages/zustand"));

const routes: RouteObject[] = [
  {
    path: "jotai",
    element: jotaiPage,
  },
  {
    path: "mobx",
    element: mobXPage,
  },
  {
    path: "redux",
    element: reduxPage,
  },
  {
    path: "zustand",
    element: zustandPage,
  },
];

export default routes;
