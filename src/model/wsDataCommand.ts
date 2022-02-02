// '{"reqType":0,"data":{"type":0,"parameters":"some_data"}}'

// These should match the enum found in standing-panda/src/libs/Desk.h
export enum MessageCommand {
  SEATED,
  STANDING,
  CALIBRATE,
  GO_TO_HEIGHT,
  CLIMB_FOR_MS,
  DESCEND_FOR_MS,
  PRESET_HEIGHT1,
  PRESET_HEIGHT2,
  PRESET_HEIGHT3,
  PRESET_HEIGHT4,
  ROLL_OFFSET,
  ROLL_LIMIT,
  PITCH_OFFSET,
  PITCH_LIMIT,
  SAFETY_ENABLED,
  MIN_HEIGHT,
  MAX_HEIGHT,
  STOP,
  DISPLAY_ON_OFF,
}

export enum MessageType {
  COMMAND,
  CONFIGURE,
}

export default class WsDataCommand {
  constructor(
    public reqType: MessageType,
    public data: { type: MessageCommand; parameters: string }
  ) {}
}
