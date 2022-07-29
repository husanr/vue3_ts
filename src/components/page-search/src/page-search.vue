<template>
  <div class="search">
    <ComForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <p>高级检索</p>
      </template>
      <template #footer>
        <div class="handle_btn">
          <el-button type="primary" @click="handleReset">重置</el-button>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
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
  emits: ["resetBtnClick", "searchBtnClick"],
  setup(props, { emit }) {
    // 双向绑定的数据 由配置决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ""
    }
    const formData = ref(formOriginData)

    // 重置
    const handleReset = () => {
      // formData.value = formOriginData
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit("resetBtnClick")
    }

    // 搜索
    const handleSearch = () => {
      emit("searchBtnClick", formData.value)
    }
    return {
      formData,
      handleReset,
      handleSearch
    }
  }
})
</script>

<style scoped>
.handle_btn {
  text-align: right;
}
</style>
