import StoreApi from "./storeApi";

export default class WebsocketService {
  private static gateway = `ws://${window.location.hostname}/ws`;
  private static websocket: WebSocket;

  private static instance: WebsocketService;

  public static getInstance(): WebsocketService {
    if (!WebsocketService.instance) {
      WebsocketService.instance = new WebsocketService();
      WebsocketService.instance.initWebSocket();
    }
    return WebsocketService.instance;
  }

  public getWebsocket(): WebSocket {
    return WebsocketService.websocket;
  }

  public sendData(msg: string) {
    WebsocketService.websocket.send(msg);
  }

  public initWebSocket() {
    console.log("Trying to open a WebSocket connection...");
    WebsocketService.websocket = new WebSocket(WebsocketService.gateway);
    WebsocketService.websocket.onopen = this.onOpen;
    WebsocketService.websocket.onclose = this.onClose;
    WebsocketService.websocket.onmessage = this.onMessage;
  }

  // User defined on message function
  public setOnMessage(functionCall: (_event: any) => void) {
    WebsocketService.websocket.onmessage = functionCall;
  }

  // User defined on open function
  public setOnOpen(functionCall: () => void) {
    WebsocketService.websocket.onopen = functionCall;
  }

  // User defined on close function
  public setOnClose(functionCall: () => void) {
    WebsocketService.websocket.onclose = functionCall;
  }

  // Default handlers, they should be replaced using the calls above
  private onOpen(_event: any) {
    console.log("Connection opened");
    StoreApi.setItem("uiConfig.websocketConnected", true);
  }

  // Default handlers, they should be replaced using the calls above
  private onClose(_event: any) {
    console.log("Connection closed");
    StoreApi.setItem("uiConfig.websocketConnected", false);
    setTimeout(() => WebsocketService.instance.initWebSocket(), 2000);
  }

  // Default handlers, they should be replaced using the calls above
  private onMessage(_event: any) {
    console.log(_event);
  }
}
