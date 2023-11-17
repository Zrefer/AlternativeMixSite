export interface IMonitoring {
  servername: string;
  online: number;
  max_online: number;
}

export interface IMonitoringResponse {
  status: number;
  msg: string;
  data?: {
    servers: IMonitoring[];
  };
}
