import StoreApi from "./storeApi";

export default class LogService {
  public static debug(msg: string) {
    if (StoreApi.getState().uiConfig.loggingEnabled) console.log(msg);
  }
}
