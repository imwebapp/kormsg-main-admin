import { ViewLeft } from "./components/ViewLeft";
import { ViewRight } from "./components/ViewRight";

export default function UserChat() {
  return (
    <div className="flex flex-row h-[calc(100vh-100px)]">
      <ViewLeft />
      <ViewRight />
    </div>
  );
}
