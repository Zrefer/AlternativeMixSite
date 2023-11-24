export interface IServerData {
  id: number;
  server: string;
  permissionName: string;
  version: string | null;
}

export interface IStatusPriceData {
  id: number;
  name: string;
  price: number;
  serverSuffix: string;
  version: string;
}

export interface IPlayerGroupData {
  server: string;
  group: string;
  endTime: string;
}

export interface ICabinetData {
  serverList: IServerData[];
  priceList: IStatusPriceData[];
  playerGroupList: IPlayerGroupData[];
}

export interface ICabinetResponse {
  status: number;
  msg: string;
  data: ICabinetData;
}
