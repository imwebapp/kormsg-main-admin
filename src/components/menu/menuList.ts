import { Url } from "../../routers/paths";

export const menuList : Record<string,string> = {
    'dashboard' : Url.dashboard,
};

const swap = (json : Record<string, string>) => {
    const ret : Record<string, string> = {};
    for(let key in json){
        ret[json[key]] = key;
    }
    return ret;
}

export const menuListSwap : Record<string, string> = swap(menuList)