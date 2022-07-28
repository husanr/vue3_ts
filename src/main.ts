import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import { setupStore } from "./store"
// import api from "./service"

import { globalRegister } from "./global"
import ElementPlus from "element-plus"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import zhCn from "element-plus/es/locale/lang/zh-cn"

import "normalize.css"
import "./assets/css/index.less"

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
  locale: zhCn
})

setupStore()
app.use(router)
app.use(store)
app.use(globalRegister)
app.mount("#app")

// api.get({
//   url: "aaa"
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// api
//   .request<DataType>({
//     url: "aaa1",
//     method: "get",
//     showLoading: false,
//     interceptors: {
//       requestInterceptor: (config) => {
//         console.log("单独请求的config设置")
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log("单独请求的res设置")
//         return res
//       }
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
