import { Link, Outlet, useLocation } from "react-router";
import routes from "@/router/routes";

function App() {
  const { pathname } = useLocation();
  console.log(import.meta.env.BASE_URL, pathname);
  return (
    <div className="flex items-center justify-center">
      {pathname !== import.meta.env.BASE_URL ? (
        <div className="flex w-dvw flex-col items-center justify-center">
          <Link to={import.meta.env.BASE_URL} className="my-2 text-3xl">
            Index
          </Link>
          {/* const routes = [{ path: "/", Component: lazy(() => import("@/pages/jotai")) }] */}
          {/* <Suspense fallback="Loading..."> */}
          <Outlet />
          {/* </Suspense> */}
        </div>
      ) : (
        <ul className="flex h-dvh w-dvw flex-col items-center justify-center gap-12 text-5xl">
          {routes.map(
            (route) =>
              route.path && (
                <li key={route.path}>
                  <Link to={route.path}>{route.path}</Link>
                </li>
              ),
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
