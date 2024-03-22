import { useBulletinState } from "../store";

export default function BulletinRight() {
  const { boardSelected } = useBulletinState((state) => state);


  return (
    <div className="w-[320px] border-l p-6">
      {boardSelected.id === "HOME" ? <div></div> : <div></div>}
    </div>
  );
}
