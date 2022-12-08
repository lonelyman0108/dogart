<template>
    <div>
        <div class="admin-container">
            <!-- 头部 -->
            <div class="admin-header">舔狗的艺术 - 内容管理</div>
            <!-- 主体 -->
            <div class="admin-login">
                <el-form ref="form" :model="forms" :rules="rules" label-width="80px">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="forms.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="forms.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="doLogin">登录</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 底部 -->
            <div>
                
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { ElMessage } from 'element-plus';
    import {checkLogin, login} from '@adminApi/homeApi';

    const router = useRouter();
    const form = ref();
    const forms = reactive({
        username: "",
        password: ""
    });
    const rules = {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }

    const doCheckLogin = () => {
      checkLogin().then(res => {
        if(res.code === 200){
          router.push("/admin");
        }
      })
    }

    const doLogin = () => {
        form.value.validate((valid) => {
            if(valid){
                login(forms).then(res => {
                  console.log(res.data)
                    if(res.code === 200){
                        window.localStorage.setItem("token",res.data)
                        router.push("/admin");
                    }else{
                        ElMessage.error("账号密码错误");
                    }
                })
            }else{
                return false;
            }
        });
    }

    onMounted(() => {
        doCheckLogin();
        document.onkeydown = (e) => {
            e = window.event || e
            if (e.keyCode === 13){
                doLogin()
            }
        }
    })

</script>
