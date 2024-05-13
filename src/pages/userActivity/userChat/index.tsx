import { User } from "../../../utils/common";
import { ViewLeft } from "./components/ViewLeft";
import { ViewRight } from "./components/ViewRight";
interface IProps {
  dataUser: User;
}
export default function UserChat(props: IProps) {
  const { dataUser } = props;

  return (
    <div className="flex flex-row h-[calc(100vh-100px)] overflow-hidden ">
      <ViewLeft dataUser={dataUser} />
      <ViewRight />
    </div>
  );
}
