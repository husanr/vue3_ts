<template>
  <div class="login_account">
    <el-form label-width="70px">
      <el-form-item label="手机号" required prop="number">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" required prop="code">
        <div class="get_code">
          <el-input v-model="phone.code"></el-input>
          <el-button type="primary" class="get_btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"

export default defineComponent({
  setup() {
    const phone = reactive({
      number: "132",
      code: "123"
    })

    const loginPhone = () => {
      console.log("手机号登录")
    }

    return {
      phone,
      loginPhone
    }
  }
})
</script>

<style scoped lang="less">
.get_code {
  display: flex;
  .get_btn {
    margin-left: 10px;
  }
}
</style>
