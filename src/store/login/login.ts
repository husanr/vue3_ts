import { Module } from "vuex"
import { ILoginState } from "./types"
import { IRootState } from "../types"
import { IAccount } from "@/service/login/types"
import {
  accountLoginRequest,
  requestUserInfo,
  requestUserMenus
} from "@/service/login/login"
import localCache from "@/utils/cache"

import router from "@/router"
import { mapMenusToRoutes } from "@/utils/map-menus"

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, menus: any) {
      state.userMenus = menus

      // 添加路由
      const routes = mapMenusToRoutes(menus)
      routes.forEach((route) => {
        router.addRoute("main", route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log("执行loginAction", payload)
      // 1. 实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit("changeToken", token)
      localCache.setCache("token", token)
      // 2. 请求用户信息
      const userInfoResult = await requestUserInfo(id)
      const userInfo = userInfoResult.data
      commit("changeUserInfo", userInfo)
      localCache.setCache("userInfo", userInfo)
      // 3. 获取权限对应菜单
      const userMenusResult = await requestUserMenus(id)
      const userMenus = userMenusResult.data
      commit("changeUserMenus", userMenus)
      localCache.setCache("userMenus", userMenus)
      // 4. 跳转首页
      router.push("/main")
    },
    loadLocal({ commit }) {
      const token = localCache.getCache("token")
      if (token) {
        commit("changeToken", token)
      }
      const userInfo = localCache.getCache("userInfo")
      if (userInfo) {
        commit("changeUserInfo", userInfo)
      }
      const userMenus = localCache.getCache("userMenus")
      if (token) {
        commit("changeUserMenus", userMenus)
      }
    }
  },
  getters: {}
}

export default loginModule
