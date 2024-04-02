import {
  Dashboard,
  DashboardIncomingPage,
  DashboardInflowPage,
  DashboardOverviewPage,
  DashboardReferralPage,
  DashboardVisitPage,
  Login,
  StorePage,
  NewStore,
  UserManage,
  UserDetail,
  ReservationDetails,
  AppVersion,
  BulletinPage,
  SeoPage,
  ReportPage,
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
    detail: true,
  },
  {
    path: Url.bulletinBoard,
    element: <BulletinPage />,
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
        element: <ReservationDetails />,
      },
    ],
  },
  {
    path: Url.newStore,
    element: <NewStore />,
    custom: true,
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
    element: <ReportPage />,
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
    element: <AppVersion />,
  },
  {
    path: Url.seo,
    element: <SeoPage />,
  },
  {
    path: Url.setting,
    element: <div className="p-4">coming soon</div>,
  },
];
export default routes;
