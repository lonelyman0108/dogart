<script setup>
import {ref, reactive, onMounted} from 'vue'
import {login} from "@/request/api/admin.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

let loginForm = reactive({
  userName: '',
  password: ''
})
const form = ref()

const doLogin = () => {
  form.value.validate((valid) => {
    if (valid) {
      login(loginForm.userName, loginForm.password)
          .then((res) => {
            if (res.code === 200) {
              window.localStorage.setItem('token', res.data)
              router.push('admin')
            } else {
              loginForm.password = ''
              ElMessage.error(res.msg)
            }
          })
    }
  })
}

const rules = {
  userName: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
}

onMounted(() => {
  const token = window.localStorage.getItem('token')
  if (token) {
    router.replace('admin')
  }
})
</script>

<template>
  <div class="login-form">
    <ElForm ref="form" :model="loginForm" label-width="auto" label-position="right" :rules="rules">
      <ElFormItem label="用户名：" prop="userName">
        <ElInput v-model="loginForm.userName"/>
      </ElFormItem>
      <ElFormItem label="密码：" prop="password">
        <ElInput v-model="loginForm.password" type="password"/>
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" @click="doLogin" class="login-button">登录</ElButton>
  </div>
</template>

<style scoped>
.login-form {
  width: 400px;
  margin: 40px auto;
}

.login-button {
  width: 100%;
}
</style>