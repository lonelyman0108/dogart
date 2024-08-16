<script setup>
import {reactive} from "vue";
import {ElRow, ElCol} from 'element-plus'

const menus = reactive([
      {
        name: '舔狗の语',
        path: '/words',
      },
      {
        name: '舔狗日记',
        path: '/articles',
      },
    ]
)

</script>

<template>
  <div class="header">🐶舔狗的艺术</div>
  <ElRow justify="center" >
    <ElCol>
      <ElMenu class="menu-tab" mode="horizontal" router :default-active="$route.path">
        <ElMenuItem v-for="menu in menus" :index="menu.path" :key="menu.path">
          {{ menu.name }}
        </ElMenuItem>
      </ElMenu>
      <RouterView/>
    </ElCol>
  </ElRow>
</template>

<style scoped>
.menu-tab{
  justify-content: center;
  border-bottom: none;
}
</style>