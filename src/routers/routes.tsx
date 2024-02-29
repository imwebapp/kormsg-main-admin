import {
  Dashboard,
  DashboardIncomingPage,
  DashboardInflowPage,
  DashboardOverviewPage,
  DashboardReferralPage,
  DashboardVisitPage,
  Login,
  StorePage,
  UserManage,
  UserDetail,
} from "../pages";
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
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: Url.dashboardOverview,
        element: <DashboardOverviewPage />,
      },
      {
        path: Url.dashboardInflowDomaine,
        element: <DashboardInflowPage />,
      },
      {
        path: Url.dashboardReferral,
        element: <DashboardReferralPage />,
      },
      {
        path: Url.dashboardVisit,
        element: <DashboardVisitPage />,
      },
      {
        path: Url.dashboardIncoming,
        element: <DashboardIncomingPage />,
      },
    ],
  },
  {
    path: Url.user,
    element: <UserManage />,
  },
  {
    path: Url.userDetail,
    element: <UserDetail />,
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
        element: <StorePage />,
      },
      {
        path: Url.storeListing,
        element: <StorePage />,
      },
      {
        path: Url.reservationDetails,
        element: <div className="p-4">coming soon</div>,
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
