<template>
  <div class="user">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <ComTable :listData="userList" :propList="propList">
      <template #status="scope">
        <el-button>{{ scope.row.enable === 1 ? "启用" : "禁用" }}</el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ scope.row.createAt }}</strong>
      </template>
    </ComTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { searchFormConfig } from "./config/search.config"
import PageSearch from "@/components/page-search"
import { useStore } from "@/store"
import ComTable from "@/base-ui/table"

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    ComTable
  },
  setup() {
    const store = useStore()
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
      {
        prop: "realname",
        label: "真实姓名",
        minWidth: "100",
        slotName: "realname"
      },
      {
        prop: "cellphone",
        label: "手机号码",
        minWidth: "100",
        slotName: "cellphone"
      },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
      {
        prop: "createAt",
        label: "创建时间",
        minWidth: "100",
        slotName: "updateAt"
      },
      {
        prop: "updateAt",
        label: "更新时间",
        minWidth: "100",
        slotName: "updateAt"
      }
    ]

    return {
      userList,
      userCount,
      propList,
      searchFormConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
