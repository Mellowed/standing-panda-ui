import store from "@/store";
import * as ss from "@/store/state";

export default class StoreApi {
  private constructor() {
    // Preventing construction of store api
  }

  public static getState(): ss.State {
    return store.getters["getState"];
  }

  // There is enough opportunity for type errors in the store.dispatch request that using
  // the lazy setItem as a general data set method seems ok for now.

  /**
   * Lazy setItem
   * set an item in the store by describing its path and parsing a value.
   *
   * e.g. setItem(data {'authentication.google.username', 'bob' })
   *
   * @param data
   */
  public static setItem(path: string, value: any): void {
    const data = { path: path, value: value };
    store.dispatch("setItem", data);
  }

  /**
   * Lazy pushItem
   * Add to an item in the store by describing its path and parsing a value.
   *
   * e.g. pushItem(data {'notifications', 'Error detected' })
   *
   * @param data
   */
  public static pushItem(path: string, value: any): void {
    const data = { path: path, value: value };
    store.dispatch("pushItem", data);
  }
}
