<template>
  <div class="nav_header">
    <el-icon class="fold_menu" @click="handleFoldClick">
      <Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
    <div class="content">
      <ComBreadcrumb :breadcrumbs="breadcrumbs" />
      <div><user-info /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue"
import { Fold, Expand } from "@element-plus/icons-vue"
import UserInfo from "./user-info.vue"
import ComBreadcrumb from "@/base-ui/breadcrumb"
import { pathMapToBreadcrumbs } from "@/utils/map-menus"
import { useStore } from "@/store"
import { useRoute } from "vue-router"

export default defineComponent({
  components: {
    Fold,
    Expand,
    UserInfo,
    ComBreadcrumb
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit("foldChange", isFold.value)
    }
    // 面包屑
    const store = useStore()
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const currentPath = route.path
      const userMenus = store.state.login.userMenus
      return pathMapToBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      breadcrumbs,
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
