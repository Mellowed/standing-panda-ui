export declare type WsDataSensorStruct = {
  acceleration: { x: number; y: number; z: number };
  gyro: { x: number; y: number; z: number };
  pitch: number;
  roll: number;
  height: number;
  temp: number;
};
export declare type WsDataConfigStruct = {
  preset1: number;
  preset2: number;
  preset3: number;
  preset4: number;
  rollOffset: number;
  rollLimit: number;
  pitchOffset: number;
  pitchLimit: number;
  safetyEnabled: number;
};
