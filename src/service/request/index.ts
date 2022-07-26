import axios from "axios"
import type { AxiosInstance } from "axios" //axios参数类型引入
import type { RequestInterceptors, APIRequestConfig } from "./type"
import { ElLoading } from "element-plus"
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading"
import "element-plus/es/components/loading/style/css"

// 默认有loading，不需要可以单独设置
const DEFAULT_LOADING = true

class APIRequest {
  instance: AxiosInstance //自带的
  interceptors?: RequestInterceptors //扩展的
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: APIRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中..."
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res.data
        if (data.returnCode === "-1001") {
          console.log("响应失败结果的msg")
        } else {
          return data
        }
      },
      (err) => {
        setTimeout(() => {
          this.loading?.close()
        }, 2000)
        if (err.response.status !== 200) {
          console.log("响应失败状态的msg")
        }
        return err
      }
    )
  }

  request<T>(config: APIRequestConfig<T>): Promise<T> {
    // 单独请求的拦截器
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 初始化showLoading
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 初始化showLoading
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: APIRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" })
  }

  post<T = any>(config: APIRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" })
  }

  delete<T = any>(config: APIRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "delete" })
  }

  patch<T = any>(config: APIRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "patch" })
  }
}
export default APIRequest
