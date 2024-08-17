<script setup>
import {ref, onMounted} from "vue";

import {getWords, lickWords} from "@/request/api/words.js";
import {ElMessage} from "element-plus";

const content = ref("");
const contentId = ref(0);
const lickCount = ref(0);
const licked = ref(false);
const canNotGetMore = ref(false);

const doGetWords = () => {
  getWords().then(res => {
    content.value = res.data.content;
    contentId.value = res.data.id;
    lickCount.value = res.data.lickCount;
    licked.value = false;
    canNotGetMore.value = true;
    setTimeout(() => {
      canNotGetMore.value = false;
    }, 500)
  })
}

const doLickWords = () => {
  lickWords(contentId.value).then(res => {
    licked.value = true;
    lickCount.value += 1;
  })
}

const doCopy = () => {
  navigator.clipboard.writeText(content.value);
  ElMessage.success("复制成功")
}

onMounted(() => {
  doGetWords();
})

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
    <ElButton type="primary" round @click="doGetWords" :disabled="canNotGetMore">再来一条</ElButton>
    <ElButton round @click="doLickWords" :disabled="licked">
      <img src="@/assets/img/lick.gif" style="height: 22px;" alt="舔"/> x {{ lickCount }}
    </ElButton>
    <ElButton type="info" round @click="doCopy">复制</ElButton>
  </div>
  <div class="buttons">
    <ElButton type="primary" round>投稿</ElButton>
  </div>
</template>

<style scoped>

</style>