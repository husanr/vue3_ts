<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import LoginPanel from "./cpns/login-panel.vue"

export default defineComponent({
  name: "login",
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url("@/assets/img/login/bg.jpeg") no-repeat;
  background-size: 100% 100%;
}
</style>
