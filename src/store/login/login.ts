import { Module } from "vuex"
import { ILoginState } from "./types"
import { IRootState } from "../types"
import { IAccount } from "@/service/login/types"
import { accountLoginRequest } from "@/service/login/login"
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {}
    }
  },
  mutations: {},
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log("执行loginAction", payload)
      // if (payload.name === "天启123" && payload.password === "123456") {
      //   console.log("登录成功!")
      // } else {
      //   console.log("登录失败!")
      // }
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
    }
  },
  getters: {}
}

export default loginModule
