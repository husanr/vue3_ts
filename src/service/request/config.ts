let BASE_URL = ""
let BASE_NAME = ""
const TIME_OUT = 10000

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api"
  BASE_NAME = "aaa"
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http2"
  BASE_NAME = "bbb"
} else {
  BASE_URL = "http3"
  BASE_NAME = "ccc"
}

export { BASE_URL, BASE_NAME, TIME_OUT }
