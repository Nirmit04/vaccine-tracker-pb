import { Store } from "redux";

let store: Store;

class StoreProviderService {
  public init(configureStore: any): void {
    store = configureStore();
  }

  public getStore(): Store {
    return store;
  }
}

const storeProviderService = new StoreProviderService();
export { storeProviderService as StoreProviderService };
