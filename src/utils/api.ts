import axios, { AxiosError, AxiosResponse, Method } from "axios";
import {
  ILoginForm,
  ILoginResponse,
  IUser,
  IUserResponse,
} from "../types/user";
import { IArticle, IArticlesData, IArticlesResponse } from "../types/article";

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

export const loginUser = async (form: ILoginForm): Promise<string> => {
  const response = await doRequest<ILoginResponse>(
    `${baseUrl}/api/login_check`,
    "POST",
    undefined,
    form
  );
  if (response.token) return response.token;
  throw new Error("Authentication error");
};

export const logoutUser = async (token: string) => {
  await doRequest(`${baseUrl}/api/logout`, "POST", token, {});
};

export const fetchUserData = async (token: string): Promise<IUser> => {
  const response = await doRequest<IUserResponse>(
    `${baseUrl}/api/user`,
    "GET",
    token
  );
  if (response.data) return response.data;
  throw new Error("Authentication error");
};

export const fetchFeedData = async (page: number): Promise<IArticlesData> => {
  const response = await doRequest<IArticlesResponse>(
    `${baseUrl}/articles?page=${page}&postsPerPage=6`
  );
  if (response.data && response.data.length > 0) {
    const data = response.data[0];
    return { last_page: data.last_page, articles: data.articles };
  }
  throw new Error("News fetch error");
};
