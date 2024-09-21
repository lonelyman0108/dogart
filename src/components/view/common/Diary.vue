<script setup>
import {ref, onMounted} from 'vue'
import {getDiary, lickDiary, postDiary} from "@/request/api/diary.js";
import {ElMessage} from "element-plus";
import {getWeather} from "@/request/api/common/weather.js";
import PostDialog from "@/components/common/PostDialog.vue";

const content = ref("");
const contentId = ref(0);
const lickCount = ref(0);
const licked = ref(false);
const canNotGetMore = ref(false);

let city = ref('')
let date = ref('')
let weather = ref('')
let temperature = ref('')

let showPostDialog = ref(false)

let contentRules = [
  {required: true, message: '不说点什么怎么舔呢', trigger: 'blur'},
  {min: 8, max: 140, message: '你的投稿内容的长度达不到舔狗标准(8-140字)', trigger: 'blur'}
]

const doGetDiary = () => {
  getDiary().then(res => {
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

const doLickDiary = () => {
  lickDiary(contentId.value).then(
      res => {
        lickCount.value += 1;
        licked.value = true;
      }
  )
}

const doGetWeather = () => {
  getWeather().then(res => {
    city.value = res.city.split("市")[0];
    date.value = res.data.date + " " + res.data.week;
    weather.value = res.data.type;
    temperature.value = res.data.low.split("°C")[0] + "~" + res.data.high.split("°C")[0] + "°C";
  })
}

const doCopy = () => {
  navigator.clipboard.writeText(content.value);
  ElMessage.success("复制成功")
}

const doPostDiary = (content) => {
  postDiary(content).then(res => {
    if (res.code === 200) {
      showPostDialog.value = false
      ElMessage.success("投稿成功")
    } else {
      ElMessage.error(res.msg)
    }
  })
}

onMounted(() => {
  doGetDiary()
  doGetWeather()
})
</script>

<template>
  <div class="content-box">
    <el-card class="box-card" shadow="always">
      <div class="content" v-cloak>
        <p>{{ date }}</p>
        <p>{{ city }} {{ weather }} {{ temperature }}</p>
        <p>{{ content }}</p>
      </div>
    </el-card>
  </div>
  <div class="buttons">
    <ElButton type="primary" round @click="doGetDiary" :disabled="canNotGetMore">再来一条</ElButton>
    <ElButton round @click="doLickDiary" :disabled="licked">
      <img src="../../../assets/img/lick.gif" style="height: 22px;" alt="舔"/> x {{ lickCount }}
    </ElButton>
    <ElButton type="info" round @click="doCopy">复制</ElButton>
  </div>
  <div class="buttons">
    <ElButton type="primary" round @click="showPostDialog=true">投稿</ElButton>
  </div>
  <PostDialog :isShow="showPostDialog" title="投稿 - 舔狗日记" :doPostFunc="doPostDiary" :contentRules="contentRules"
              :closeDialogFunc="()=>{showPostDialog=false}"/>
</template>

<style scoped>

</style>