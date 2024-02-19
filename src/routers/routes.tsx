import { Dashboard, Login } from "../pages";
import { Url } from "./paths";
const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: Url.login,
    element: <Login />,
  },
  {
    path: Url.dashboard,
    element: <Dashboard />,
  },
  // {
  //   path: Url.org,
  //   children: [
  //     {
  //       path: 'org',
  //       element: <Org />,
  //     },
  //     {
  //       path: 'role',
  //       element: <Role />,
  //     },
  //     {
  //       path: 'permission',
  //       element: <Permission />,
  //     },
  //   ],
  // },
];
export default routes;
