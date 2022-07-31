<template>
  <div class="menu">
    <el-card>
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="menu"
        handleBtnText="新建菜单"
      ></PageContent>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import { contentTableConfig } from "./config/content.config"

import PageContent from "@/components/page-content"

export default defineComponent({
  name: "manage-menu",
  components: {
    PageContent
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
