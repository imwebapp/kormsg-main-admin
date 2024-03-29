import { Route, Routes, useNavigate } from "react-router-dom";
import { Url } from "./paths";
import { useEffect } from "react";
import routes from "./routes";
import DashboardLayout from "../components/layout/DashboardLayout";
import { DetailLayout } from "../components/layout/DetailLayout";
import { useLocalStorage } from "../stores/localStorage";

const Router = () => {
  const navigate = useNavigate();
  const { accessToken } = useLocalStorage((state) => state);
  useEffect(() => {
    if (!accessToken) {
      navigate(Url.login);
    } else {
      navigate(Url.dashboard);
    }
  }, []);

  return (
    <Routes>
      {routes.map((item: any) =>
        item.children ? (
          <Route key={item.path} path={item.path}>
            {item.children.map((e: any) => {
              return (
                <Route
                  key={item.path + e.path}
                  path={e.path}
                  element={
                    item.path !== Url.login ? (
                      <DashboardLayout>{e.element}</DashboardLayout>
                    ) : (
                      e.element
                    )
                  }
                />
              );
            })}
          </Route>
        ) : (
          <Route
            key={item.path}
            path={item.path}
            element={
              item.path !== Url.login ? (
                item.detail ? (
                  <DetailLayout>{item.element}</DetailLayout>
                ) : (
                  item.custom ? (
                    item.element
                  ) : (
                    <DashboardLayout>{item.element}</DashboardLayout>
                  )
                )
              ) : (
                item.element
              )
            }
          />
        )
      )}
    </Routes>
  );
};
export default Router;
