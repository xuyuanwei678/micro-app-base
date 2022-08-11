<!--
 * @Author: BlackJoken
 * @Date: 2022-01-11 10:02:56
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-19 09:57:55
-->
<template>
  <div class="readers">{{ readersNumber }} 我是global.less中的颜色
    <div class="readers-book">
      {{ book.title }}
    </div>
    <div class="class_global class_min">
        我是全局的style2
    </div>
    <div class="class_global class_min2">
        我是全局的style2
    </div>
    <div class="class_global class_min2">
        VITE_BASE_API=>>{{url}}
    </div>
    <el-button @click="fullScreen">整个网页全屏</el-button>
    <div class="now-time">当前时间:{{nowTime}}</div>
    <!--使用screenfull全屏element元素时，element内部元素推荐使用百分比+flex布局大小会同全屏变化，从而实现自适应布局-->
    <div class="full-element" id="full-element-id">
      <el-button @click="fullScreen_element">单个element全屏</el-button>
      <div ref='font' class="test-element">
        我是字体大小
      </div>
      
    </div>
    <div class="iconfont icon-sousuoxiao"></div>
    <editor></editor>

  </div>
</template>

<script lang="ts">
/**
 * ref:创建基本类型响应式变量，值发生改变可改变dom（xxx.value）
 * reactive：创建复杂类型（对象，数组）响应式变量，值发生改变可改变dom(直接使用)
 */
  import { ref, reactive,onMounted,getCurrentInstance,defineComponent,defineAsyncComponent } from 'vue'
  
  import screenfull from 'screenfull'
  import editor from './editor/editor.vue'
  export default {
    components:{
      editor
    },
    setup() {
      const {proxy } = getCurrentInstance();
      const font = ref(null);

      onMounted(() => {
        console.log("onMounted===",proxy.$dayjs());
        console.log('字体',font.value)
        getTableData()
        moment_date()
      });
      const readersNumber = ref(0)
      const book = reactive({ title: 'Vue 3 Guide' })
      const url = ref(import.meta.env.VITE_BASE_API)

      const page = ref(1)
      const total = ref(0)
      const pageSize = ref(10)
      const tableData = ref([])
      const searchInfo = ref({})

     
      
      // 加载了适配器
      let msg = ref('')

      let editorData = ref('')
      const editorConfig = reactive({
        language: 'zh-cn',            //使用中文包
        removePlugins: ['MediaEmbed'], // 除去视频按钮
        ImageUploadUrl: '/api'
      })

      
      const plugins = ref([]);
      let nowTime = ref('YYYY年MM月DD日 a HH:mm:ss')
      const moment_date =()=>{
        setInterval(() => {
          nowTime.value = proxy.$dayjs().format('YYYY年MM月DD日 a HH:mm:ss')
        }, 1000);
      } 
      
      const getTableData = async() => {
        
        
    }
      const fullScreen = ()=>{
        /**
         * based on screenfull@6.0.0
         */
        //来回切换
        screenfull.toggle();
      }
      const fullScreen_element = ()=>{
        const element = document.getElementById('full-element-id');

        //font.value.style.fontSize = 50 + 'px'
        console.log(font.value.style)
        
        screenfull.toggle(element);
        console.log('element',element.style.width)
      }
    
      // expose to template
      return {
        readersNumber,
        book,
        url,
        getTableData,
        moment_date,
        fullScreen,
        fullScreen_element,
        font,
        nowTime,
        moment_date,
      }
    }
  }
</script>
<style scoped lang="less">
    .readers{
        color: @color_test;
        height: 100vh;
        background: #223322;
        .readers-book{
            color: blue;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        .now-time{
          font-size: 24px;
        }
        .full-element{
          width: 200px;
          height: 200px;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          align-content: flex-start;
          .test-element{
            width: 25%;
            height: 25%;
            background: #fff;
          }
        }
    }
    .class_min{
        font: .24rem sans-serif;
    }
    .class_min2{
        font: 24px sans-serif;
    }
</style>