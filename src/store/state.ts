import { WsDataConfigStruct, WsDataSensorStruct } from "@/model/wsDataStruct";

export class State {
  sensors = {
    acceleration: { x: 0, y: 0, z: 0 },
    gyro: { x: 0, y: 0, z: 0 },
    pitch: 0,
    roll: 0,
    height: 0,
    temp: 0,
  } as WsDataSensorStruct;
  mcuConfig = {
    preset1: 80,
    preset2: 90,
    preset3: 100,
    preset4: 110,
    rollOffset: 0,
    rollLimit: 1,
    pitchOffset: 0,
    pitchLimit: 1,
    safetyEnabled: 1,
  } as WsDataConfigStruct;
  uiConfig = {
    loggingEnabled: false,
    websocketConnected: true,
  };
}
