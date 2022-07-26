import apiRequest from "../index"
import { IDataType } from "../types"
import { IAccount, ILoginResult } from "./types"

enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/" // role/1/menu
}
export function accountLoginRequest(account: IAccount) {
  return apiRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function requestUserInfo(id: number) {
  return apiRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenus(id: number) {
  return apiRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + "/menu"
  })
}
