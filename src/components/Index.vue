<script setup>
import PageHeader from "@/components/common/PageHeader.vue";
import PageContent from "@/components/common/PageContent.vue";
import PageFooter from "@/components/common/PageFooter.vue";
</script>

<template>
  <ElContainer>
    <ElHeader>
      <PageHeader/>
    </ElHeader>
    <ElMain>
      <PageContent/>
    </ElMain>
    <ElFooter>
      <PageFooter/>
    </ElFooter>
  </ElContainer>
</template>

<style scoped>
.el-container {
  min-height: 100vh;
}
.el-header {
  padding: 0;
  height: 100px;
}
.el-main {
  padding: 0;
  margin: 0;
}
.el-footer {
  padding: 0;
  height: 100px;
}
</style>