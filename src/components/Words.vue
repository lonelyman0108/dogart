<script setup>
import {ref} from "vue";

let content = ref("");

</script>

<template>
  <div class="content-box">
    <el-card class="box-card" shadow="always">
      <div class="content" v-cloak>
        <div class="text">{{ content }}</div>
      </div>
    </el-card>
  </div>
  <div class="buttons">
    <ElButton type="primary" round>再来一条</ElButton>
    <ElButton type="primary" round>舔</ElButton>
    <ElButton type="primary" round>复制</ElButton>
    <ElButton type="primary" round>投稿</ElButton>
  </div>
</template>

<style scoped>
.box-card {
  height: 100%;
}

</style>