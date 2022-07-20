<template>
  <div class="nav_header">
    <el-icon class="fold_menu" @click="handleFoldClick">
      <Fold v-if="isFold" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { Fold, Expand } from "@element-plus/icons-vue"
export default defineComponent({
  components: {
    Fold,
    Expand
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
  .fold_menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
