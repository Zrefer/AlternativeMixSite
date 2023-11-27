import {
  IAddFundsForm,
  IBuyGroupForm,
  IBuyItemForm,
  IChangePassForm,
  ILoginForm,
  IRegisterForm,
} from "../types/forms";
import { IArticlesData, IArticlesResponse } from "../types/article";
import {
  IBuyItemResponse,
  IShopBase,
  IShopCategory,
  IShopEnchant,
  IShopItem,
  IShopResponse,
} from "../types/shop";
import { ICabinetData, ICabinetResponse } from "../types/cabinet";
import { ILoginResponse, IUser, IUserResponse } from "../types/user";
import { IMonitoring, IMonitoringResponse } from "../types/monitoring";
import axios, { AxiosError, AxiosResponse, Method } from "axios";

import { IBuyGroupResponse } from "../types/buyStatus";
import { IPaymentResponse } from "../types/payment";

const baseUrl = "https://minecraft.mix-servers.com/backend";

async function doRequest<T = any>(
  url: string,
  method: Method = "GET",
  token?: string,
  data?: any
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
      data,
    });

    if (response.data) return response.data;
    else throw new Error("No data available");
  } catch (error) {
    if (!axios.isAxiosError(error)) throw error;

    const serverError = error as AxiosError<{ message: string }>;
    if (!serverError || !serverError.response) throw error;

    console.error("Request Error:", serverError.response.data);

    if (serverError.response.status === 401)
      throw new Error("Authentication error");

    throw new Error(
      serverError.response.data.message || "An unknown error occurred"
    );
  }
}

export const loginUserRequest = async (form: ILoginForm): Promise<string> => {
  const response = await doRequest<ILoginResponse>(
    `${baseUrl}/api/login_check`,
    "POST",
    undefined,
    form
  );
  if (response.token) return response.token;
  throw new Error("Authentication error");
};

export const logoutUserRequest = async (token: string) => {
  await doRequest(`${baseUrl}/api/logout`, "POST", token, {});
};

export const registerUserRequest = async (form: IRegisterForm) => {
  await doRequest(`${baseUrl}/api/register`, "POST", undefined, form);
};

export const changeUserPasswordRequest = async (form: IChangePassForm) => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) throw new Error("Token was null");

  return await doRequest<{
    status: number;
    msg: string;
    data: string[] | null;
  }>(`${baseUrl}/api/change-password`, "POST", accessToken, form);
};

export const fetchUserRequest = async (token: string): Promise<IUser> => {
  const response = await doRequest<IUserResponse>(
    `${baseUrl}/api/user`,
    "GET",
    token
  );
  if (response.data) return response.data;
  throw new Error("Authentication error");
};

export const fetchFeedRequest = async (
  page: number
): Promise<IArticlesData> => {
  const response = await doRequest<IArticlesResponse>(
    `${baseUrl}/articles?page=${page}&postsPerPage=6`
  );
  if (response.data && response.data.length > 0) {
    const data = response.data[0];
    return { last_page: data.last_page, articles: data.articles };
  }
  throw new Error("News fetch error");
};

export const fetchCabinetRequest = async (
  token: string
): Promise<ICabinetData> => {
  const response = await doRequest<ICabinetResponse>(
    `${baseUrl}/api/cabinet-data`,
    "POST",
    token
  );
  if (response.data) return response.data;
  throw new Error("No cabinet data received");
};

export const getPaymentData = async (form: IAddFundsForm) => {
  if (form.paymentMethod === "none")
    throw new Error("Select the payment method");

  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) throw new Error("Token was null");

  let route;
  switch (form.paymentMethod) {
    case "qiwi":
      route = "payment-qiwi";
      break;
    case "card":
      route = "payment/paypalych";
      break;
    case "foreignCard":
    case "sbp":
      route = "payment-tome";
      break;
    case "payeer":
      route = "payment/payeer";
      break;
  }

  try {
    const response = await doRequest<IPaymentResponse>(
      `${baseUrl}/api/${route}?sum=${form.sum}`,
      "POST",
      accessToken
    );
    if (response.data) return response.data;
  } catch {
    throw new Error("Unknown error");
  }
  throw new Error("No payment url received");
};

export const buyGroup = async (form: IBuyGroupForm) => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) throw new Error("Token was null");

  try {
    const response = await doRequest<IBuyGroupResponse>(
      `${baseUrl}/api/cabinet-buy-group`,
      "POST",
      accessToken,
      form
    );
    if (response.data) return response.data;
  } catch {
    throw new Error("Unknown error");
  }
  throw new Error("No buyGroup data received");
};

export const fetchMonitoringRequest = async (): Promise<IMonitoring[]> => {
  const response = await doRequest<IMonitoringResponse>(
    `${baseUrl}/monitoring`
  );
  if (response.data) return response.data.servers ?? [];
  throw new Error("Monitoring fetch error");
};

const shopRequest = async <
  T extends IShopBase | IShopItem | IShopCategory | IShopEnchant
>(
  url: string
): Promise<T[]> => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) throw new Error("Token was null");

  const response = await doRequest<IShopResponse>(url, "GET", accessToken);
  if (response.data) return response.data as T[];
  throw new Error("No shop data received");
};

export const fetchShopsRequest = async (): Promise<IShopBase[]> => {
  return await shopRequest<IShopBase>(`${baseUrl}/api/shop`);
};

export const fetchShopItemsRequest = async (
  shop_id: number
): Promise<IShopItem[]> => {
  return await shopRequest<IShopItem>(`${baseUrl}/api/shop/${shop_id}`);
};

export const fetchShopCategoriesRequest = async (
  shop_id: number
): Promise<IShopCategory[]> => {
  return await shopRequest<IShopCategory>(
    `${baseUrl}/api/shop-categories?shopId=${shop_id}`
  );
};

export const fetchShopsEnchantsRequest = async (): Promise<IShopEnchant[]> => {
  return await shopRequest<IShopEnchant>(`${baseUrl}/api/shop-enchants`);
};

export const buyItem = async (form: IBuyItemForm): Promise<string> => {
  const accessToken = localStorage.getItem("access-token");
  if (!accessToken) throw new Error("Token was null");

  try {
    const response = await doRequest<IBuyItemResponse>(
      `${baseUrl}/api/shop-buy-item`,
      "POST",
      accessToken,
      form
    );
    if (response.data) return response.data.massage;
  } catch {
    throw new Error("Unknown error");
  }
  throw new Error("No buyItem data received");
};
