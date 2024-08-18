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
  <ElContainer>
    <ElAside width="200px">
      <ElScrollbar>
        <ElMenu class="menu-tab" mode="vertical" router :default-active="$route.path">
          <ElMenuItem v-for="menu in menus" :index="menu.path" :key="menu.path">
            {{ menu.name }}
          </ElMenuItem>
        </ElMenu>
      </ElScrollbar>
    </ElAside>
    <ElMain>
      <RouterView/>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.el-container {
  display: flex;
}
.el-main {
  padding: 0;
  margin: 0;
}

.el-aside {
  padding: 0;
  margin: 0;
}
</style>