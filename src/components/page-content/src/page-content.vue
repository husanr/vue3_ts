<template>
  <div>
    <ComTable
      :listData="dataList"
      :totalCount="totalCount"
      @selectionChange="selectionChange"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #handler="scope" v-if="isCreate">
        <el-button type="primary" @click="handleNewClick(scope.row)">
          {{ handleBtnText }}
        </el-button>
      </template>

      <!-- 列表中的插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'primary' : 'danger'"
        >
          {{ scope.row.enable === 1 ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <b>{{ $filters.formatUTC(scope.row.createAt) }}</b>
      </template>
      <template #updateAt="scope">
        <b>{{ $filters.formatUTC(scope.row.updateAt) }}</b>
      </template>
      <template #handle="scope">
        <div class="handle_btns">
          <el-button
            type="primary"
            size="small"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ComTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue"
import { useStore } from "@/store"

import { usePermission } from "@/hooks/usePermission"

import ComTable from "@/base-ui/table"

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      require: true
    },
    handleBtnText: {
      type: String,
      default: "新建"
    }
  },
  components: {
    ComTable
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore()

    // 获取操作的权限
    const isCreate = usePermission(props.pageName, "create")
    const isUpdate = usePermission(props.pageName, "update")
    const isDelete = usePermission(props.pageName, "delete")
    const isQuery = usePermission(props.pageName, "query")

    // 双向绑定pageinfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    )
    const totalCount = computed(() =>
      store.getters["system/pageTotalCount"](props.pageName)
    )

    const selectionChange = (value: any) => {
      console.log(value)
    }

    // 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false
        if (item.slotName === "createAt") return false
        if (item.slotName === "updateAt") return false
        if (item.slotName === "handle") return false
        return true
      }
    )

    const handleNewClick = () => {
      emit("newBtnClick")
    }
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item)
    }

    // 删除操作
    const handleDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch("system/deletePageData", {
        pageName: props.pageName,
        id: item.id
      })
    }

    return {
      dataList,
      totalCount,
      selectionChange,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleNewClick,
      handleEditClick,
      handleDeleteClick
    }
  }
})
</script>

<style scoped lang="less"></style>
