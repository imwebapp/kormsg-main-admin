import { Layout } from "antd";
import HeaderComponent from "../header";
const { Header } = Layout;

export const DetailLayout = ({ children }: any) => {
  return (
    <Layout className="h-screen bg-white">
      <Layout className="bg-white ">
        <Header
          className="bg-white border-b h-[71px] px-6"
          children={<HeaderComponent />}
        />
        <div className="overflow-auto">{children}</div>
      </Layout>
    </Layout>
  );
};