<template>
  <div class="user">
    <div class="search">
      <ComForm v-bind="searchFormConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ComForm from "@/base-ui/form"
import { searchFormConfig } from "./config/search.config"
export default defineComponent({
  name: "user",
  components: {
    ComForm
  },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
