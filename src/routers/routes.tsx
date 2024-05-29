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
  UserActivity,
  ReservationDetails,
  AppVersion,
  BulletinPage,
  SeoPage,
  ReportPage,
  BlogPage,
  SettingPage,
  HelpCenter,
  PointHistoryPage,
  ToolBoxPage,
  SiteLinkPage,
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
    path: Url.userActivity,
    element: <UserActivity />,
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
    element: <HelpCenter />,
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
    element: <PointHistoryPage />,
  },
  {
    path: Url.blogs,
    element: <BlogPage />,
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
    path: Url.site,
    element: <SiteLinkPage />,
  },
  {
    path: Url.setting,
    element: <SettingPage />,
  },
  {
    path: Url.toolbox,
    element: <ToolBoxPage />,
    custom: true,
  },
];
export default routes;
