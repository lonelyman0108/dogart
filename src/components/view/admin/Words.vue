<script setup>
import {reactive, onMounted} from "vue";
import {adminGetWords, adminChangeWordsFlag} from "@/request/api/words.js";
import {ArrowDown} from '@element-plus/icons-vue'

let wordsList = reactive([])

let doAdminGetWords = () => {
  adminGetWords().then(res => {
    wordsList.splice(0, wordsList.length, ...res.data)
  })
}
let doAdminChangeWordsFlag = (id, flag) => {
  adminChangeWordsFlag(id, flag).then(res => {
    doAdminGetWords()
  })
}
const dateFormat = (row) => {
  const date = new Date(row.createDate);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
onMounted(() => {
  doAdminGetWords()
})
</script>

<template>
  <div class="table-content">
    <ElTable :data="wordsList" height="100%" highlight-current-row>
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
      <ElTableColumn label="操作" fixed="right">
        <template #default="scope">
          <div class="handle-cell">
            <el-dropdown trigger="click">
              <el-button type="primary" class="dropdown-link">处理
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-if="scope.row.flag === 0 || scope.row.flag === 1"
                                    @click="doAdminChangeWordsFlag(scope.row.id,2)">驳回
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.flag === 0 || scope.row.flag === 2"
                                    @click="doAdminChangeWordsFlag(scope.row.id,1)">通过
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </template>
      </ElTableColumn>
      <template #empty>暂无语录</template>
    </ElTable>
  </div>
</template>

<style scoped>

</style>