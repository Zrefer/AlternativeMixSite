export interface IArticle {
  id: number;
  autor: string;
  story: string;
  img: string;
  title: string;
  altName: string;
  date: string;
  comment_num: number;
  like: number;
  myLike: boolean;
}

export interface IArticlesData {
  articles: IArticle[];
  last_page: number;
}

export interface IArticlesResponse {
  status: number;
  msg: string;
  data?: IArticlesData[];
}
