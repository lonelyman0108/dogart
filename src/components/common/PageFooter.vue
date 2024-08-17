<script setup>
import {ref} from 'vue'

let apiDialog = ref(false)
let aboutDialog = ref(false)
let updateDialog = ref(false)

</script>

<template>
  <div class="footer">
    <div class="footer-link" style="line-height:30px;">
      <el-link type="primary" class="footer-link-item" @click="apiDialog = true" :underline="false">API</el-link>
      <el-link type="primary" class="footer-link-item" :underline="false" href="https://github.com/lonelyman0108/dogart"
               target="_blank">Github
      </el-link>
      <el-link type="primary" class="footer-link-item" @click="aboutDialog = true" :underline="false">关于</el-link>
      <el-link type="primary" class="footer-link-item" @click="updateDialog = true" :underline="false">更新日志
      </el-link>
    </div>
    <div class="footer-text">
      <p>Build with 💻 & ❤️</p>
      <p>️by LM</p>
    </div>
  </div>

  <el-dialog title="API" v-model="apiDialog">
    <p>舔狗的艺术公共API正在开发中.......</p>
    <p>本项目采用以下API接口：</p>
    <p>
      - <el-link type="primary" :underline="false" href="https://api.vvhan.com">韩小韩WebAPI接口</el-link> 提供了 舔狗日记的天气、城市 接口
    </p>
    <p>对以上API接口服务表示感谢❤️</p>
  </el-dialog>

  <el-dialog title="关于" v-model="aboutDialog">
    <p>大家好，我是LM</p>
    <p>项目原作者是<el-link type="primary" :underline="false" href="https://github.com/Dieinwarm/dogvite">Dieinwarm/dogvite</el-link></p>
    <p>最开始原作者的API失效了，所以自己就用JAVA写了一个API，最近学了Vue，就想着把这个项目的前端部分复刻一下，练练手</p>
    <p>大家觉得项目有点意思的话，欢迎给原作者star</p>
  </el-dialog>

  <el-dialog title="更新记录" v-model="updateDialog">
    <h3>2024.8.18</h3>
    <p>复刻前端，用Vue + Vite 实现</p>
    <h3>2022.12.8</h3>
    <p>重构后端，用Java + SpringBoot 实现，感谢原作者<a href="https://github.com/Dieinwarm">Dieinwarm</a></p>
  </el-dialog>
</template>

<style scoped>
.footer {
  text-align: center;
  width: 100%;
}

.footer-link-item {
  margin: 0 10px;
}

.footer-text {
  margin-top: 10px;
  font-size: 12px;
  color: #808b96;
}

.footer-text p {
  margin: 5px;
}

</style>