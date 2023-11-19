export interface IUser {
  nick: string;
  reg_date: string;
  email: string;
  money: number;
}

export interface IUserResponse {
  status: number;
  msg: string;
  data?: IUser;
}
