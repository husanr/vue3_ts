<template>
  <div class="nav_header">
    <el-icon class="fold_menu" @click="handleFoldClick">
      <Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/">promotion management</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div><user-info /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { Fold, Expand } from "@element-plus/icons-vue"
import UserInfo from "./user-info.vue"
export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav_header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold_menu {
    font-size: 30px;
    cursor: pointer;
    margin-right: 10px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
}
</style>
