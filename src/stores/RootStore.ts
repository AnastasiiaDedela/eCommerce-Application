// RootStore.ts
import UserStore from './UserStore';
import AuthStore from './AuthStore';
import CatalogStore from './CatalogStore';
import CategoryStore from './CategoryStore';
import CartStore from './cartStore'



class RootStore {
  userStore: UserStore;
  authStore: AuthStore;
  catalogStore: CatalogStore;
  categoryStore: CategoryStore;
  cartStore: CartStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore();
    this.catalogStore = new CatalogStore();
    this.categoryStore = new CategoryStore();
    this.cartStore = new CartStore();
  }
}


export default RootStore;
