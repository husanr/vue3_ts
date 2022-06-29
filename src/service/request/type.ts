import type { AxiosRequestConfig, AxiosResponse } from "axios" //axios参数类型引入

// 把拦截变成灵活的，不同接口可能有不同拦截
export interface RequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface APIRequestConfig extends AxiosRequestConfig {
  // 扩展类型
  interceptors?: RequestInterceptors
}
