<template>
    <div>
        <el-table :data="tableData" max-height="700" border stripe :table-layout="tableLayout" >
            <el-table-column prop="id" label="ID" width="80" ></el-table-column>
            <el-table-column prop="createDate" label="日期" width="180" ></el-table-column>
            <el-table-column prop="content" label="内容" ></el-table-column>
            <el-table-column prop="ipAddress" label="IP地址" width="140" ></el-table-column>
            <el-table-column label="状态" width="140" >
              <template #default="scope">
                <el-tag v-if="scope.row.flag===1" type="success">已通过</el-tag>
                <el-tag v-if="scope.row.flag===0" type="info">未审核</el-tag>
                <el-tag v-if="scope.row.flag===2" type="danger">已拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审核" fixed="right" width="150">
              <template #default="scope">
                <el-button v-if="scope.row.flag===0 || scope.row.flag===2" @click="passVerification(scope.row.id, 1)" type="success" size="small" >通过</el-button>
                <el-button v-if="scope.row.flag===0 || scope.row.flag===1" @click="passVerification(scope.row.id, 2)" type="danger" size="small" >拒绝</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { diaryList, changeDiaryFlag } from "@adminApi/homeApi";
import { ElMessage, ElSelect } from "element-plus";
const tableData = ref();
const tableLayout = ref("fixed");

const getWords = () => {
    diaryList().then((res) => {
        tableData.value = res.data;
    });
};

const passVerification = (id, type) => {
    changeDiaryFlag({
        id: id,
        flag: type,
    }).then((res) => {
        if (res.code === 200) {
            ElMessage.success("操作成功");
            getWords();
        } else {
            ElMessage.error("操作失败");
        }
    });
};

onMounted(() => {
    getWords();
});
</script>