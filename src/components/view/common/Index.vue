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
  <ElMain>
    <ElMenu class="menu-tab" mode="horizontal" router :default-active="$route.path">
      <ElMenuItem v-for="menu in menus" :index="menu.path" :key="menu.path">
        {{ menu.name }}
      </ElMenuItem>
    </ElMenu>
    <RouterView/>
  </ElMain>
  <ElFooter>
    <PageFooter/>
  </ElFooter>
</template>

<style scoped>
.el-main {
  padding: 0;
  margin: 0;
}

.el-footer {
  padding: 0;
  height: 100px;
}

.menu-tab {
  justify-content: center;
  border-bottom: none;
  height: 100%;
}
</style>