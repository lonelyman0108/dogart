<script setup>
import {ref, onMounted} from "vue";

import {getWords, lickWords, postWords} from "@/request/api/words.js";
import {ElMessage} from "element-plus";
import PostDialog from "@/components/view/common/PostDialog.vue";

const content = ref("");
const contentId = ref(0);
const lickCount = ref(0);
const licked = ref(false);
const canNotGetMore = ref(false);

let showPostDialog = ref(false)

let contentRules = [
  {required: true, message: "你的日记什么都不写吗？", trigger: 'blur'},
  {min: 20, max: 300, message: '你投稿的日记舔不够深刻啊(20-300字)', trigger: 'blur'}
]

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

const doPostDiary = (content) => {
  postWords(content).then(res => {
    if (res.code === 200) {
      showPostDialog.value = false
      ElMessage.success("投稿成功")
    } else {
      ElMessage.error(res.msg)
    }
  })
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
    <ElButton type="primary" round @click="showPostDialog=true">投稿</ElButton>
  </div>
  <PostDialog :isShow="showPostDialog" title="投稿 - 舔狗の语" :doPostFunc="doPostDiary" :contentRules="contentRules"
              :closeDialogFunc="()=>{showPostDialog=false}"/>
</template>

<style scoped>

</style>