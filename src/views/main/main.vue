<template>
  <div>main</div>
  <h2>{{ $store.state.name }}</h2>
  <el-button type="primary" round>Primary</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "main",
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
