import { useEffect } from "react";
import Images from "../../../../assets/gen";

type NaverMapProps = {
  positionStore?: any;
};

const NaverMapComponent = (props: NaverMapProps) => {
  const { positionStore } = props;
  const generateMap = (latitude: any, longitude: any) => {
    if (!naver.maps) window.location.reload();
    const container = document.getElementById("map");
    if (container) {
      if (container && container.innerHTML !== "") {
        container.innerHTML = ""; // Xóa nội dung của thẻ div
      }
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 18,
      });
      new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map,
        icon: {
          content: `<div style="position: relative">
                <img src="${Images.pinMap}" style="width : 40px; height: 47px" alt="">
              </div>`,
          size: new naver.maps.Size(30, 35),
        },
      });
    }
  };
  useEffect(() => {
    generateMap(positionStore.lat, positionStore.long);
  }, [positionStore]);
  return <div id="map" style={{ width: "961px", height: "700px" }} />;
};

export default NaverMapComponent;
