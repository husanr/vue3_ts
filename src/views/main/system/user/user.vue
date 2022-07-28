<template>
  <div class="user">
    <el-card class="box-card">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </el-card>
    <el-card class="box-card">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="users"
      ></PageContent>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"

export default defineComponent({
  name: "user",
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
