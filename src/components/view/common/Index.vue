<script setup>

import PageFooter from "@/components/common/PageFooter.vue";

import {reactive} from "vue";

const menus = reactive([
      {
        name: '舔狗の语',
        path: '/words',
      },
      {
        name: '舔狗日记',
        path: '/diary',
      },
    ]
)
</script>

<template>
  <el-container>
    <ElMain>
      <ElMenu class="menu-tab" mode="horizontal" router :default-active="$route.path">
        <ElMenuItem v-for="menu in menus" :index="menu.path" :key="menu.path">
          {{ menu.name }}
        </ElMenuItem>
      </ElMenu>
      <RouterView/>
    </ElMain>
    <ElFooter height="100px">
      <PageFooter/>
    </ElFooter>
  </el-container>
</template>

<style scoped>
.el-container {
  flex-direction: column;
}

.el-main {
  padding: 0;
  margin: 0;
}

.menu-tab {
  justify-content: center;
  border-bottom: none;
  height: 50px;
}
</style>