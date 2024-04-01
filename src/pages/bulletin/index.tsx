import BulletinLeft from "./viewleft";
import BulletinPreview from "./viewpreview";
import BulletinRight from "./viewright";

export default function BulletinPage() {
  return (
    <div className="flex flex-row h-[calc(100vh-72px)]">
      <BulletinLeft />
      <BulletinPreview />
      <BulletinRight />
    </div>
  );
}
