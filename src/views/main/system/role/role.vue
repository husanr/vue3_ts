<template>
  <div class="role">
    <el-card class="box-card">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </el-card>
    <el-card class="box-card">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="role"
      ></PageContent>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
</style>
