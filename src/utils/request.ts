// import { clearStorage, getStorage, STORAGE_KEYS } from "./storage.service";
import http from "./axios-config";
import { BaseResponse } from "./common";
import { Config } from "./constants";
// import { environment } from "../environments/environment";
// import { BaseResponse } from "../models/common/common";
// import { toast } from "react-toastify";
const ERROR_CODE = {};
const toast = {
  error: (any: string) => {},
};

const unAuthorizeHandler = async () => {
  //   clearStorage();
};

const handleError = async (error: any, _apiUrl = null, _data = null) => {
  if (error.response) {
    //Check 401
    if (error.response.status === 401) {
      await unAuthorizeHandler();
    } else if (error.response.data.errorCode) {
      toast.error(
        ERROR_CODE[error.response.data.errorCode as keyof typeof ERROR_CODE]
      );
    } else if (error.response.data.message) {
      if (typeof error.response.data.message === "string") {
        toast.error(error.response.data.message);
      } else if (typeof error.response.data.message[0] === "string") {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error(
          ERROR_CODE[error.response.data.message as keyof typeof ERROR_CODE]
        );
      }
    } else {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
  } else if (error.request) {
    console.log(1);

    // The request was made but no response was received
    // error.request is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    console.log(2);
    // Something happened in setting up the request that triggered an Error
  }

  throw error;
};

// const getAccessToken = async () => {
//   try {
//     return getStorage(STORAGE_KEYS.TOKEN)
//       ? getStorage(STORAGE_KEYS.TOKEN)
//       : null;
//   } catch (e) {
//     await handleError(e);
//   }
// };

const getHeader = async (config = {}) => {
  //   const token = await getAccessToken();
  return {
    "Content-Type": "application/json",
    // Authorization: "token && Bearer ${token}",
  };
};

const getMethod = async <T>(
  url: string,
  params?: any
): Promise<T> => {
  const headers = await getHeader();
  return http
    .get(Config.HOST_API + url, {
      headers: headers,
      params: params,
    })
    .then((data: { data: any }) => {
      return data.data;
    })
    .catch(async (e: { response: { data: any } }) => {
      await handleError(e);
      return e.response.data;
    });
};

const postMethod = async <T>(
  url: string,
  data: any,
  config?: any
): Promise<BaseResponse<T>> => {
  return http({
    method: "POST",
    url: Config.HOST_API + url,
    headers: await getHeader(config),
    data: data,
  })
    .then((data: { data: any }) => {
      return data.data;
    })
    .catch(async (e: { response: { data: any } }) => {
      await handleError(e);
      return e.response.data;
    });
};

const putMethod = async <T>(
  url: string,
  data: any,
  config?: any
): Promise<BaseResponse<T>> => {
  return http({
    method: "PUT",
    url: Config.HOST_API + url,
    headers: await getHeader(config),
    data: data,
  })
    .then((data: { data: any }) => {
      return data.data;
    })
    .catch(async (e: { response: { data: any } }) => {
      await handleError(e);
      return e.response.data;
    });
};

const patchMethod = async <T>(
  url: string,
  data: any,
  config?: any
): Promise<BaseResponse<T>> => {
  return http({
    method: "PATCH",
    url: Config.HOST_API + url,
    headers: await getHeader(config),
    data: data,
  })
    .then((data: { data: any }) => {
      return data.data;
    })
    .catch(async (e: { response: { data: any } }) => {
      await handleError(e);
      return e.response.data;
    });
};

const deleteMethod = async <T>(
  url: string,
  data: any
): Promise<BaseResponse<T>> => {
  return http({
    method: "DELETE",
    url: Config.HOST_API + url,
    headers: await getHeader(),
    data: data,
  })
    .then((data: { data: any }) => {
      return data.data;
    })
    .catch(async (e: any) => {
      await handleError(e);
      throw e;
    });
};

export { getMethod, postMethod, putMethod, deleteMethod, patchMethod };
