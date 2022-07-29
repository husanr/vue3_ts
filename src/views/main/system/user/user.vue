<template>
  <div class="user">
    <el-card class="box-card">
      <PageSearch
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @searchBtnClick="handleSearchClick"
      ></PageSearch>
    </el-card>
    <el-card class="box-card">
      <PageContent
        ref="pageContentRef"
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

import { usePageSearch } from "@/hooks/usePageSearch"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleSearchClick
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
</style>
