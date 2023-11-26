export interface IBasePaymentData {
  payment: "tome" | "qiwi";
  url: string;
}

export interface IPayeerPaymentData {
  payment: "payeer";
  sign: string;
  m_orderid: string;
}

export interface IPaypalychPaymentData {
  payment: "paypalych";
  sign: string;
}

export type IPaymentData =
  | IBasePaymentData
  | IPayeerPaymentData
  | IPaypalychPaymentData;

export interface IPaymentResponse {
  status: number;
  msg: string;
  data: IPaymentData;
}
