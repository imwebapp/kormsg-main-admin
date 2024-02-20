import { Url } from "../../routers/paths";

export const menuList: Record<string, string> = {
    [Url.dashboard]: Url.dashboard,
    [Url.user]: Url.user,
    [Url.bulletinBoard]: Url.bulletinBoard,
    [Url.store]: Url.store,
    [Url.storeListing]: Url.storeListing,
    [Url.reservationDetails]: Url.reservationDetails,
    [Url.shopping]: Url.shopping,
    [Url.helpCenter]: Url.helpCenter,
    [Url.report]: Url.report,
    [Url.subcription]: Url.subcription,
    [Url.pointHistory]: Url.pointHistory,
    [Url.blogs]: Url.blogs,
    [Url.appVersion]: Url.appVersion,
    [Url.seo]: Url.seo,
    [Url.setting]: Url.setting,
};

const swap = (json: Record<string, string>) => {
    const ret: Record<string, string> = {};
    for (let key in json) {
        ret[json[key]] = key;
    }
    return ret;
}

export const menuListSwap: Record<string, string> = swap(menuList)