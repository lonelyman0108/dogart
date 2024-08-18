<script setup>
import PageHeader from "@/components/common/PageHeader.vue";
</script>

<template>
  <ElContainer class="outer-container">
    <ElHeader>
      <PageHeader/>
    </ElHeader>
    <RouterView/>
  </ElContainer>
</template>

<style scoped>
.outer-container {
  min-height: 100vh;
}

.el-header {
  padding: 0;
  height: 100px;
}


</style>