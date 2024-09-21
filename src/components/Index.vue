<script setup>
import PageHeader from "@/components/common/PageHeader.vue";
</script>

<template>
    <ElContainer class="outer-container">
      <ElHeader>
        <PageHeader/>
      </ElHeader>
      <ElContainer class="inner-container">
        <RouterView/>
      </ElContainer>
    </ElContainer>
</template>

<style scoped>
.outer-container{
  height: 100vh;
  width: 100%;
}

.inner-container {
  height: calc(100% - 80px);
}

.el-header {
  padding: 0;
  height: 80px;
}


</style>