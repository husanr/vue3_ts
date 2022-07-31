<template>
  <div class="role">
    <el-card class="box-card">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </el-card>
    <el-card class="box-card">
      <PageContent
        :contentTableConfig="contentTableConfig"
        pageName="role"
        handleBtnText="新建角色"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></PageContent>
    </el-card>
    <PageModal
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      pageName="role"
      :modalFormConfig="modalFormConfig"
    >
      <div class="menu_tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue"
import { useStore } from "@/store"

import PageSearch from "@/components/page-search"
import PageContent from "@/components/page-content"
import PageModal from "@/components/page-modal"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalFormConfig } from "./config/modal.config"

import { usePageModal } from "@/hooks/usePageModal"

import { menuMapLeafKeys } from "@/utils/map-menus"
import { ElTree } from "element-plus"

export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallBack = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value, leafKeys)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallBack)

    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    const otherInfo = ref()
    const handleCheckChange = (data1: any, data2: any) => {
      console.log(data1, data2)
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalFormConfig,
      pageModalRef,
      defaultInfo,
      otherInfo,
      handleNewData,
      handleEditData,
      menus,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
.menu_tree {
  margin-left: 55px;
}
</style>
