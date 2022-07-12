import type { AxiosRequestConfig, AxiosResponse } from "axios" //axios参数类型引入

// 把拦截变成灵活的，不同接口可能有不同拦截
export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface APIRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  // 扩展类型
  interceptors?: RequestInterceptors<T>
  showLoading?: boolean
}
