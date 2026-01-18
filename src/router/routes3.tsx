import { lazy, Suspense, type FunctionComponent } from "react";
import type { RouteObject } from "react-router";

type DynamicImport = () => Promise<{ default: FunctionComponent }>;

const withLazy = (load: DynamicImport) => {
  const LazyComponent = lazy(load);
  return () => (
    <Suspense fallback="Loading...">
      <LazyComponent />
    </Suspense>
  );
};

const JotaiPage = withLazy(() => import("@/pages/jotai"));
const MobXPage = withLazy(() => import("@/pages/mobx"));
const ReduxPage = withLazy(() => import("@/pages/redux"));
const ZustandPage = withLazy(() => import("@/pages/zustand"));

const routes: RouteObject[] = [
  {
    path: "jotai",
    Component: JotaiPage,
  },
  {
    path: "mobx",
    Component: MobXPage,
  },
  {
    path: "redux",
    Component: ReduxPage,
  },
  {
    path: "zustand",
    Component: ZustandPage,
  },
];

export default routes;
