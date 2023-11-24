export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm {
  nick: string;
  password: string;
  password2: string;
  email: string;
}

export interface IAddFundsForm {
  sum: number;
  paymentMethod: "none" | "qiwi" | "card" | "foreignCard" | "sbp" | "payeer";
}

export interface IBuyGroupForm {
  changeGroup: boolean;
  groupName: string;
  monthsNum: number;
  serverId: string;
}
