<script setup>

import {reactive} from "vue";

const menus = reactive([
      {
        name: '舔狗の语',
        path: '/admin/words',
      },
      {
        name: '舔狗日记',
        path: '/admin/diary',
      },
    ]
)
</script>

<template>
  <ElAside width="200px">
    <ElMenu class="menu-tab" mode="vertical" router :default-active="$route.path">
      <ElMenuItem v-for="menu in menus" :index="menu.path" :key="menu.path">
        {{ menu.name }}
      </ElMenuItem>
    </ElMenu>
  </ElAside>
  <ElMain class="main-content">
    <RouterView/>
  </ElMain>
</template>

<style scoped>

.main-content {
  height: 100%;
  padding: 10px;
}

.el-aside {
  padding: 0;
  margin: 0;
}

.menu-tab {
  justify-content: center;
  height: 100%;
}

.handle-cell {
  align-items: center;
  display: flex;
}
</style>