<template>
	<div>
		<div class="diary-content-box">
			<el-card class="box-card">
				<div class="diary-content" v-cloak>
					<div class="diary-text">
						<p>{{ citystr }} <br> {{ weatherstr }}</p>
						<p>{{ content }}</p>
					</div>
				</div>
			</el-card>
		</div>
		<div class="buttons">
			<el-button type="primary" size="default" @click="doGetDiary" round>再来一份</el-button>
      <el-button size="default" @click="doLick" round :disabled="clickLick"><img src="@/assets/lick.gif" style="height: 22px;" /> <span class="lickCount">&nbsp;×{{ animatedNumber }}</span></el-button>
			<el-button type="success" size="default" @click="sendDiaryDialog = true" round>投稿</el-button>
		</div>
        <el-dialog title="投稿 舔狗日记" v-model="sendDiaryDialog" custom-class="send_dialog">
            <p style="color: #808B96;">你可以投稿你当舔狗时记录下的日记。为了防止可能混入令人不适的内容，
                你的投稿会进行<el-link type="primary" href="https://ai.baidu.com/tech/textcensoring" target="_blank">文本内容审核</el-link>，通过方予展示，
                如果被判断内容疑似有 暴恐违禁、政治敏感、恶意推广、低俗辱骂、低质灌水 等倾向，
                则会拒绝这篇日记进入内容库。</p>
            <el-form :model="diaryForm" ref="diaryForms" :rules="rules">
                <el-form-item prop="diary">
                    <el-input type="textarea" :rows="9" placeholder="请输入内容" v-model="diaryForm.diary"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="sendDiaryDialog = false">取消</el-button>
                    <el-button type="primary" @click="sendDiary">确定</el-button>
                </span>
            </template>
        </el-dialog>
	</div>
</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from 'vue'
    import { getDiary, postDiary, lickDiary } from '@api/diarysApi'
    import { ElMessage } from 'element-plus';
    import axios from 'axios'
import {gsap} from "gsap";
import {lickWords} from "@api/wordsApi";
    const diaryId = ref(0);
    const citystr = ref("");
    const content = ref("");
    const lickCount = ref(0);
    const tweenedNumber = ref(0);
    const clickMore = ref(false);
    const clickLick = ref(false);
    const weatherstr = ref("");
    const sendDiaryDialog = ref(false);
    const diaryForms = ref();
    const diaryForm = reactive({
        diary: ""
    });
    const rules = reactive({
        diary: [
            {required: true, message: "你的日记什么都不写吗？", trigger: 'blur'},
            {min: 15, max: 160, message: '你的日记长度不符合字数限制(15-160字)', trigger: 'blur'}
        ]
    })

    const getweather = () => {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = (date.getMonth() + 1).toString();
        let day = date.getDate().toString();
        let city = localStorage.getItem('city') || '';
        let cloud = localStorage.getItem('cloud') || '';
        let cond = localStorage.getItem('cond') || '';
        let dateStart = new Date(localStorage.getItem('date') || new Date());
        let dayDiff = date.getDate() - dateStart.getDate();
        let weatherKeys = [
            'fbb7fed63979495f88fc1ddc7296f497', 
            'f3488e987bce466d8ae6b523becf278f',
            '95cf38cd40b84df9beae340c610e8550', 
            '3cad9669ecba42c39ebfd73cdb566329', 
            '6ec2f3eef9bc448ba8a72e815dd86f12'
        ];
        if (city === '' || dayDiff >= 1) {
            let weather = {};
            for (const element of weatherKeys) {
              axios.get('https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=' + element).then(res => {
                    weather = res.data.HeWeather6[0];
                    city = weather.basic.parent_city || '';
                    cloud = weather.now.fl || '';
                    cond = weather.now.cond_txt || '';
                    localStorage.setItem('city', city);
                    localStorage.setItem('cloud', cloud);
                    localStorage.setItem('cond', cond);
                    localStorage.setItem('date', new Date());
                }).catch(err => {
                    console.log(err);
                })
                if (weather.status === 'ok') {
                    break;
                }
            }
        }
        citystr.value = year + '年' + month + '月' + day + '日 ' + city;
        weatherstr.value =  cond + ' / ' + cloud + '℃';
    }
    const doGetDiary = () => {
        getDiary().then(res => {
          diaryId.value = res.data.id;
          content.value = res.data.content;
          lickCount.value = res.data.lickCount;
          clickMore.value = true;
          setTimeout(function (){
            clickMore.value = false;
          },800);
        })
    }
    const doLick = () => {
      lickDiary({
        id: diaryId.value
      }).then(res => {
        clickLick.value = true;
        lickCount.value += 1;
      });
    }
    const sendDiary = () => {
        diaryForms.value.validate((valid) => {
            if(valid){
                postDiary(diaryForm).then(res => {
                    ElMessage.success('恭喜你提交成功，审核后即可显示');
                    diaryForms.value.resetFields();
                    sendDiaryDialog.value = false;
                });
            }else{
                return false;
            }
        })
    }

    onMounted(() =>{
        getweather();
        doGetDiary();
    })

    const animatedNumber = computed(() => {
      return tweenedNumber.value.toFixed(0);
    });

    watch(lickCount,(nv) => {
      tweenedNumber.value = 0;
      gsap.to(tweenedNumber, { duration: 0.5, value: nv });
    });
</script>