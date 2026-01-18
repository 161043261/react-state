import { createBrowserRouter } from "react-router";
import App from "@/App";
import routes from "./routes2";

const router = createBrowserRouter([
  {
    path: import.meta.env.BASE_URL,
    Component: App,
    children: routes,
  },
]);

export default router;
