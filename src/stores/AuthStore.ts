import { makeAutoObservable } from 'mobx';

class AuthStore {
  isAuthenticated = false;
  token!: string | null;

  constructor() {
    makeAutoObservable(this);
  }

  login() {
    this.isAuthenticated = true
    const authData = JSON.parse(localStorage.getItem('authData')!)
    this.token = authData;
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    localStorage.removeItem('authData');
  }
}

export default AuthStore;