import apiRequest from "../index"
import { IAccount } from "./types"
enum LoginApi {
  AccountLogin = "/login"
}
export function accountLoginRequest(account: IAccount) {
  return apiRequest.post({
    url: LoginApi.AccountLogin,
    data: account
  })
}
