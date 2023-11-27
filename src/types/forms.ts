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

export interface IChangePassForm {
  new_password: string;
  new_password_confirmed: string;
  password: string;
}

export interface IBuyItemForm {
  count: number;
  enchant: Record<string, number>;
  item_id: string;
  shop_id: string;
}
