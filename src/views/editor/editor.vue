<template>
    <div class="main">
        我是富文本
    </div>
    <div ref='editor'></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import WangEditor from 'wangeditor';
export default {
    setup() {
        const editor = ref();
        const content = reactive({
            html: '',
            text: '',
        });

        let instance;
        onMounted(() => {
            instance = new WangEditor(editor.value);

            instance.config.uploadImgServer = '/api'

            Object.assign(instance.config, {
                onchange() {
                    console.log('change');
                },
            });
            instance.create();
        });

        onBeforeUnmount(() => {
            instance.destroy();
            instance = null;
        });

        const syncHTML = () => {
            content.html = instance.txt.html();
        };

        return {
            syncHTML,
            editor,
            content,
        };
    }
}
</script>

<style scoped lang="less">

</style>
