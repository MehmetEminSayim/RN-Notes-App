
import { action, makeObservable, observable } from "mobx";


class Store {
  constructor() {
    makeObservable(this)
  }

  @observable userId = null
  @observable isLogin = 0
  @observable fullname = null

  @action getId = (id)=>{
    this.userId = id
  }

  @action getFullname = (fullname)=>{
    this.fullname = fullname
  }

  @action setIsLogin = (params)=>{
    console.log(params);
    this.isLogin = params
  }

}
export default new Store()
