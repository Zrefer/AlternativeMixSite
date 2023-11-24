export interface IBuyGroupData {
  changeGroup?: boolean;
  message?: string;
  error?: string;
  success?: string;
}

export interface IBuyGroupResponse {
  status: number;
  msg: string;
  data: IBuyGroupData;
}
