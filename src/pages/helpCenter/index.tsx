import { ViewLeft } from "./components/ViewLeft";
import { ViewRight } from "./components/ViewRight";

export default function HelpCenter() {
  return (
    <div className="flex flex-row h-[calc(100vh-72px)]">
      <ViewLeft />
      <ViewRight />
    </div>
  );
}
