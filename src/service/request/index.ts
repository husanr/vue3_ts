import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios" //axios参数类型引入
import type { RequestInterceptors, APIRequestConfig } from "./type"

class APIRequest {
  instance: AxiosInstance //自带的
  interceptors?: RequestInterceptors //扩展的

  constructor(config: APIRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 对应实例的拦截器
    // 请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    // 响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )
  }

  request(config: APIRequestConfig): void {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    this.instance.request(config).then((res) => {
      console.log(res)
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res)
      }
    })
  }
}
export default APIRequest
