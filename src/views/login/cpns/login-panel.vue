<template>
  <div class="login_panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="crrentTab">
      <el-tab-pane label="账号登录" name="account">
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane label="手机登录" name="phone">
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account_control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login_btn" type="primary" @click="handleLogin">
      立即登录
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import LoginAccount from "./login-account.vue"
import LoginPhone from "./login-phone.vue"

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 定义属性
    const isKeepPassword = ref(true)
    const crrentTab = ref("account")
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()

    // 定义方法
    const handleLogin = () => {
      console.log("点击登录")
      if (crrentTab.value === "account") {
        // 账号登录
        accountRef.value?.loginAccount(isKeepPassword.value)
      } else {
        // 手机登录
        phoneRef.value?.loginPhone()
      }
    }

    return {
      isKeepPassword,
      crrentTab,
      accountRef,
      phoneRef,
      handleLogin
    }
  }
})
</script>

<style scoped lang="less">
.login_panel {
  width: 320px;
  margin: auto;
  padding: 300px 0;
  text-align: center;
  .account_control {
    display: flex;
    justify-content: space-between;
    margin: 10px 30px;
  }
  .login_btn {
    margin-top: 5px;
    width: 100%;
  }
}
</style>
