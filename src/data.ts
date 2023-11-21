import { IMonitoringResponse } from "./types/monitoring";

export const monitoring: IMonitoringResponse = {
  status: 0,
  msg: "",
  data: {
    servers: [
      {
        servername: "Industrial",
        online: 7,
        max_online: 100,
      },
      {
        servername: "TechnoMagic",
        online: 76,
        max_online: 100,
      },
    ],
  },
};
