<template>
  <div class="goods">
    <el-card class="box-card">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </el-card>
    <el-card class="box-card">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="goods"
        handleBtnText="新建商品"
      >
        <template #image="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="scope.row.imgUrl"
            :preview-src-list="[scope.row.imgUrl]"
            preview-teleported="true"
          />
        </template>
        <template #oldPrice="scope">{{ "￥" + scope.row.oldPrice }}</template>
      </PageContent>
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

<style scoped></style>
