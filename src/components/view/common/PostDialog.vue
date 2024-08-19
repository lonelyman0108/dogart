<script setup>
import {ref, reactive, defineProps} from 'vue'

let postForm = reactive({
  content: ''
})
const props = defineProps({
  isShow: Boolean,
  title: String,
  doPostFunc: Function,
  closeDialogFunc: Function,
  contentRules: Array
})
const rules = {
  content: props.contentRules
}

const form = ref();

const doPost = () => {
  form.value.validate((valid) => {
    if (valid) {
      props.doPostFunc(postForm.content)
      props.closeDialogFunc()
    }
  })
}

</script>

<template>
  <el-dialog :title="title" :model-value="isShow" @close="closeDialogFunc">
    <ElText size="large">请大方的向大家展示你的舔狗功底！</ElText>
    <el-alert title="注意" type="warning" :closable="false" style="border-radius: 10px;margin: 10px 0">
      <template #default>
        <p>
          投稿内容在通过审核后为方予展示，
          如果被判断这个句子疑似有 暴恐违禁、政治敏感、恶意推广、低俗辱骂、低质灌水 等倾向，
          则会被拒稿。
        </p>
      </template>
    </el-alert>
    <el-form :model="postForm" ref="form" :rules="rules">
      <el-form-item prop="content">
        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="postForm.content"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
                <span>
                    <el-button @click="closeDialogFunc">取消</el-button>
                    <el-button type="primary" @click="doPost">确定</el-button>
                </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>