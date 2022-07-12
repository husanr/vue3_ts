<template>
  <div class="login_account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" required prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" required prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { ElForm } from "element-plus"
import { useStore } from "vuex"
import { rules } from "../config/account-rules"
import localCache from "@/utils/cache"

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? ""
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAccount = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log("真正执行的登录")
          // 1. 判断是否记住密码
          if (isKeepPassword) {
            localCache.setCache("name", account.name)
            localCache.setCache("password", account.password)
          } else {
            localCache.deleteCache("name")
            localCache.deleteCache("password")
          }

          // 2. 开始登录验证
          store.dispatch("login/accountLoginAction", { ...account })
        } else {
          console.log("阻止登录")
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAccount
    }
  }
})
</script>

<style scoped></style>
