export interface IShopItem {
  id: number;
  shop_id: number;
  img: string;
  item_name: string;
  item_id: string;
  stack: number;
  price: number;
  enchant: boolean;
  description: string;
  categories: string;
  sort: string;
}

export interface IShopCategory {
  id: number;
  name: string;
}

export interface IShopEnchant {
  id: number;
  name: string;
  enchant_id: string;
  max_lvl: number;
  price: number;
}

export interface IShopBase {
  id: number;
  shop_name: string;
  img: string;
  count: number;
}

export interface IShop extends IShopBase {
  items: IShopItem[];
  categories: IShopCategory[];
}

export interface IShopResponse {
  status: number;
  msg: string;
  data: Array<IShopBase | IShopItem | IShopCategory | IShopEnchant>;
}

export interface IShopStore {
  shops: IShop[];
  enchants: IShopEnchant[];
}

export interface IBuyItemResponse {
  status: number;
  msg: string;
  data?: {
    massage: string;
  };
}
