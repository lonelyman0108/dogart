<script setup>
import {ref, onMounted, watch} from 'vue'
import {
  listSettingTypes,
  listSettingOptions,
  getSettingOptionForm,
  updateSettingOption
} from "@/request/api/setting.js";
import {QuestionFilled} from '@element-plus/icons-vue'

let settingTypes = ref([])
let activeType = ref()
let settingOptions = ref([])
let activeOption = ref()
let formItems = ref([])
let formValues = ref([])

watch(formItems, () => {
      formValues.value = formItems.value.map(item => {
        return item.value
      })
    }, {deep: true}
)

const handleClickType = async (typeName) => {
  activeType.value = typeName
  settingOptions.value = []
  activeOption.value = ''
  formItems.value = []
  formValues.value = []

  await listSettingOptions(activeType.value).then(res => {
    settingOptions.value = res.data
  })

  if (settingOptions.value.length !== 0) {
    activeOption.value = settingOptions.value[0].name
    await handleClickOption(activeOption.value)
  }
}

const handleClickOption = async (optionName) => {
  activeOption.value = optionName
  formItems.value = []
  formValues.value = []

  await getSettingOptionForm(activeOption.value).then(res => {
    formItems.value = res.data
    formItems.value = formItems.value.map(item => {
      return {
        ...item,
        value: item.defaultValue
      }
    })
  })
}

const handleUpdateOption = () => {
  updateSettingOption(activeOption.value, formValues.value).then(res => {
    console.log(res)
  })
}

onMounted(async () => {
  await listSettingTypes().then(res => {
    settingTypes.value = res.data
  })
  if (settingTypes.value.length !== 0) {
    activeType.value = settingTypes.value[0].name
    await handleClickType(activeType.value)
  }
})
</script>

<template>
  <el-container class="content-container">
    <ElAside width="100px">
      <ElMenu class="menu-tab" mode="vertical" :default-active="activeType">
        <ElMenuItem v-for="typeItem in settingTypes" :index="typeItem.name"
                    @click="handleClickType(typeItem.name)">
          {{ typeItem.desc }}
        </ElMenuItem>
      </ElMenu>
    </ElAside>
    <ElMain>
      <el-tabs v-if="settingOptions.length !== 0" @tab-click="(pane)=>{
        handleClickOption(pane.paneName)
      }" v-model="activeOption">
        <el-tab-pane v-for="settingOption in settingOptions" :label="settingOption.desc" :name="settingOption.name">
          <el-form :model="formItems" label-width="auto">
            <el-form-item v-for="item in formItems" :key="item.name">
              <template v-slot:label>
                {{ item.name }}
                <div class="inline-icon-place">
                  <el-popover
                      v-if="item.desc"
                      placement="top-start"
                      trigger="hover"
                      :content="item.desc"
                  >
                    <template #reference>
                      <el-icon class="inline-icon">
                        <QuestionFilled/>
                      </el-icon>
                    </template>
                  </el-popover>
                </div>
              </template>
              <el-radio-group v-if="item.type === 'select'" v-model="item.value">
                <el-radio v-for="select in item.selects" :value="select" :label="select">{{ select }}</el-radio>
              </el-radio-group>
              <el-input v-if="item.type === 'input'" v-model="item.value" :placeholder="item.placeholder"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-buttons">
            <el-button type="primary" @click="handleUpdateOption">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <span>暂无配置项</span>
      </div>
    </ElMain>
  </el-container>
</template>

<style scoped>
.content-container {
  height: 100%;
  padding: 10px;
}

.menu-tab {
  justify-content: center;
  height: 100%;
}

.form-buttons {
  text-align: right;
}

.inline-icon {
  margin: 0 5px;
  height: 100%;
}

.inline-icon-place {
  display: inline-block;
  height: 100%;
  width: 1.2em;
  vertical-align: middle;
}

</style>