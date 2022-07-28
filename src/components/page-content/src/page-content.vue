<template>
  <div>
    <ComTable
      :listData="dataList"
      @selectionChange="selectionChange"
      v-bind="contentTableConfig"
    >
      <!-- header中的插槽 -->
      <template #handler>
        <el-button type="primary">新建用户</el-button>
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
      <template #handle>
        <div class="handle_btns">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </div>
      </template>
    </ComTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useStore } from "@/store"

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
    }
  },
  components: {
    ComTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    )
    const totalCount = computed(() =>
      store.getters["system/pageTotalCount"](props.pageName)
    )

    const selectionChange = (value: any) => {
      console.log(value)
    }
    return {
      dataList,
      totalCount,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less"></style>
