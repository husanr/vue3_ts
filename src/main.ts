import { createApp } from "vue"
import App from "./App.vue"

import router from "./router"
import store from "./store"
import api from "./service"

const app = createApp(App)
app.use(router)
app.use(store)

app.mount("#app")

api.request({
  url: "aaa",
  method: "get"
})

api.request({
  url: "aaa1",
  method: "get",
  interceptors: {
    requestInterceptor: (config) => {
      console.log("单独请求的config设置")
      return config
    },
    responseInterceptor: (res) => {
      console.log("单独请求的res设置")
      return res
    }
  }
})
