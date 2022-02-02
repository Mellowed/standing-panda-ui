import WebsocketService from "./websocketService";
import WsDataCommand, {
  MessageType,
  MessageCommand,
} from "@/model/wsDataCommand";

export default class DeskService {
  private static instance: DeskService;

  public static getInstance(): DeskService {
    if (!DeskService.instance) {
      DeskService.instance = new DeskService();
    }
    return DeskService.instance;
  }

  /**
   * Travel to the default standing position (Max height)
   */
  public goToStandingPosition(): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.STANDING,
      parameters: "0",
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  /**
   * Travel to the seated position (Min height)
   */
  public goToSeatedPosition(): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.SEATED,
      parameters: "",
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  /**
   *
   * Calibrate and level the desk at a specific height.
   *
   * @param height in cm
   */
  public calibrate(height = 80): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.CALIBRATE,
      parameters: height.toString(),
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public stop(): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.STOP,
      parameters: "",
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public climbForSeconds(milliseconds = 1000): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.CLIMB_FOR_MS,
      parameters: milliseconds.toString(),
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public descendForSeconds(milliseconds = 1000): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.DESCEND_FOR_MS,
      parameters: milliseconds.toString(),
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public goToHeight(height = 80): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: MessageCommand.GO_TO_HEIGHT,
      parameters: height.toString(),
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public goToPresetHeight(commandType: MessageCommand): void {
    const command = new WsDataCommand(MessageType.COMMAND, {
      type: commandType,
      parameters: "",
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }

  public saveConfigurationItem(val: number, commandType: MessageCommand): void {
    const command = new WsDataCommand(MessageType.CONFIGURE, {
      type: commandType,
      parameters: val.toString(),
    });
    WebsocketService.getInstance().sendData(JSON.stringify(command, null));
  }
}
