import { useEffect, useState } from "react";
import Images from "../../../assets/gen";
import { BOARD, BOARD_ROUTE } from "../../../utils/constants";
import { useBulletinState } from "../store";
const BASE_URL = "https://kormsg.com/";

export default function BulletinPreview() {
  const [key, setKeyIframe] = useState(0);
  const [url, setUrl] = useState(BASE_URL);
  const { boardSelected } = useBulletinState((state) => state);
  useEffect(() => {
    setKeyIframe((prevKey) => prevKey + 1);
  }, [url]);

  const createBoardLink = (route: string, thema_id?: string) => {
    let href = BOARD_ROUTE[route] ? `${BOARD_ROUTE[route]}/${thema_id}` : "";

    if (route === BOARD.EVENT_BOARD) href = "/event";
    return href;
  };

  useEffect(() => {
    if (boardSelected) {
      const url = createBoardLink(boardSelected.route, boardSelected.thema_id);
      setUrl(BASE_URL + url);
    }
  }, [boardSelected]);

  return (
    <div className="flex-1 max-h-[calc(100vh-72px)] min-w-[calc((100vh-120px)*0.52)] flex justify-center items-center relative">
      <img
        src={Images.home}
        className="h-[calc(100vh-120px)] min-w-[calc((100vh-120px)*0.52)] absolute"
      />
      <iframe
        key={key}
        className="absolute bottom-[34px] h-[calc(100vh-165px)] w-[calc((100vh-120px)*0.52-16px)] z-10 pointer-events-none"
        src={url}
      ></iframe>
    </div>
  );
}
