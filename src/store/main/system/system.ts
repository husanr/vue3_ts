import { IRootState } from "@/store/types"
import { Module } from "vuex"
import { ISystemState } from "./types"
import { getPageListData } from "@/service/main/system/system"

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload)
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}List`,
        list
      )
      commit(
        `change${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Count`,
        totalCount
      )
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageTotalCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  }
}

export default systemModule
