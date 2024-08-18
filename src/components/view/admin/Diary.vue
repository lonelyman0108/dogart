<script setup>
import {reactive, onMounted} from "vue";
import {adminGetDiaries, adminChangeDiaryFlag} from "@/request/api/diary.js";

let diaryList = reactive([])

let doAdminGetDiaries = () => {
  adminGetDiaries().then(res => {
    diaryList.splice(0, diaryList.length, ...res.data)
  })
}
let doAdminChangeDiaryFlag = (id, flag) => {
  adminChangeDiaryFlag(id, flag).then(res => {
    doAdminGetDiaries()
  })
}
const dateFormat = (row) => {
  const date = new Date(row.createDate);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
onMounted(() => {
  doAdminGetDiaries()
})
</script>

<template>
  <div class="table-content">
    <ElTable :data="diaryList" max-height="700px" highlight-current-row>
      <ElTableColumn prop="id" label="序号" width="80"/>
      <ElTableColumn prop="content" label="内容" show-overflow-tooltip/>
      <ElTableColumn prop="ipAddress" label="提交IP" width="200"/>
      <ElTableColumn prop="createDate" label="提交日期" width="200" :formatter="dateFormat"/>
      <ElTableColumn prop="lickCount" label="舔" width="80"/>
      <ElTableColumn prop="flag" label="状态" width="80">
        <template #default="scope">
          <ElTag v-if="scope.row.flag === 0" type="info">待审核</ElTag>
          <ElTag v-else-if="scope.row.flag === 1" type="success">正常</ElTag>
          <ElTag v-else-if="scope.row.flag === 2" type="danger">驳回</ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="100">
        <template #default="scope">
          <ElButton v-if="scope.row.flag === 0 || scope.row.flag === 1" type="danger" size="small"
                    @click="doAdminChangeDiaryFlag(scope.row.id,2)">驳回
          </ElButton>
          <ElButton v-if="scope.row.flag === 0 || scope.row.flag === 2" type="primary" size="small"
                    @click="doAdminChangeDiaryFlag(scope.row.id,1)">通过
          </ElButton>
        </template>
      </ElTableColumn>
      <template #empty>暂无日记</template>
    </ElTable>
  </div>
</template>

<style scoped>

</style>