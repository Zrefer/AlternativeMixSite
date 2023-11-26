import { IMonitoring } from "./monitoring";

interface IServerInfo {
  description: string;
  mods: {
    name: string;
    version?: string;
  }[];
  bannedItems?: {
    mod: string;
    item: string;
  }[];
}

interface IDonateInfo {
  name: string;
  color: string;
  price: number;
  commands: {
    name: string;
    description: string;
  }[];
  abilities: string[];
  flags?: {
    name: string;
    description: string;
  }[];
  kitsImage?: string;
}

export interface IServerInfoData {
  info: IServerInfo;
  icon?: string;
  donates: IDonateInfo[];
  monitoring?: IMonitoring;
}

export interface IServersInfoData {
  [key: string]: IServerInfoData;
}
