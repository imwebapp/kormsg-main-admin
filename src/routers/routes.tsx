import { Dashboard, Login, UserManage, ReservationDetails } from "../pages";
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
  {
    path: Url.user,
    element: <UserManage />,
  },
  {
    path: Url.bulletinBoard,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.store,
    children: [
      {
        path: "",
        element: <div className="p-4">coming soon</div>,
      },
      {
        path: Url.storeListing,
        element: <div className="p-4">coming soon</div>,
      },
      {
        path: Url.reservationDetails,
        element: <ReservationDetails />,
      },
    ],
  },
  {
    path: Url.shopping,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.helpCenter,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.report,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.subcription,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.pointHistory,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.blogs,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.appVersion,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.seo,
    element: <div className="p-4">coming soon</div>,
  },
  {
    path: Url.setting,
    element: <div className="p-4">coming soon</div>,
  },
];
export default routes;
