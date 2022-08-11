<!--
 * @Author: BlackJoken
 * @Date: 2022-01-10 14:45:33
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-12 13:41:48
-->


<template>
  <el-config-provider :locale="locale">
    <div id="app">
      <router-view class="view" />
    </div>
  </el-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElConfigProvider } from 'element-plus'

  import zhCn from 'element-plus/lib/locale/lang/zh-cn'
  
  export default defineComponent({
    components: {
      ElConfigProvider,
    },
    setup() {
      return {
        locale: zhCn,
      }
    },
  })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  padding: 0;
  margin: 0;
}
</style>
