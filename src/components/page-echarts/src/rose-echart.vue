<template>
  <div class="pie-echarts">
    <base-echarts :options="options"></base-echarts>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue"
import BaseEcharts from "@/base-ui/echarts"
import { IDataType } from "../types"

const props = defineProps<{
  roseData: IDataType[]
}>()

const options = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [10, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
