<template>
  <div class="search">
    <ComForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <p>高级检索</p>
      </template>
      <template #footer>
        <div class="handle_btn">
          <el-button type="primary">重置</el-button>
          <el-button type="primary">搜索</el-button>
        </div>
      </template>
    </ComForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import ComForm from "@/base-ui/form"

export default defineComponent({
  components: {
    ComForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ""
    })
    return {
      formData
    }
  }
})
</script>

<style scoped>
.handle_btn {
  text-align: right;
}
</style>
