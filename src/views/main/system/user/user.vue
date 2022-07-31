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
        handleBtnText="新建用户"
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
      ></PageContent>
    </el-card>
    <PageModal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalFormConfig="modalConfigRef"
    ></PageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useStore } from "@/store"

import { searchFormConfig } from "./config/search.config"
import { contentTableConfig } from "./config/content.config"
import { modalFormConfig } from "./config/modal.config"

import PageSearch from "@/components/page-search"
import PageModal from "@/components/page-modal"
import PageContent from "@/components/page-content"

import { usePageSearch } from "@/hooks/usePageSearch"
import { usePageModal } from "@/hooks/usePageModal"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleSearchClick] =
      usePageSearch()

    const newCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === "password"
      )
      passwordItem!.isHidden = false
    }
    const editCallBack = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === "password"
      )
      passwordItem!.isHidden = true
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallBack, editCallBack)

    // 处理部门和角色数据
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === "departmentId"
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })

      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === "roleId"
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modalFormConfig
    })

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleSearchClick,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped lang="less">
.box-card {
  margin-bottom: 20px;
}
</style>
