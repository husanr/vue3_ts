<template>
  <div class="page_modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建"
      width="30%"
      center
      destroy-on-close
    >
      <ComForm v-bind="modalFormConfig" v-model="formData"></ComForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="hanldeConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { useStore } from "@/store"
import ComForm from "@/base-ui/form"

export default defineComponent({
  components: {
    ComForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue, "23")
        for (const item of props.modalFormConfig!.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const store = useStore()
    const hanldeConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log("编辑用户", props.defaultInfo)
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        console.log("新建用户")
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      hanldeConfirmClick
    }
  }
})
</script>

<style scoped></style>
