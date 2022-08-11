
<template>
    <div class="prism-player" id="J_prismPlayer"></div>
    <div @click="pause">暂停</div>
</template>
<script >
import { ref, reactive,onMounted,getCurrentInstance } from 'vue'
export default {
    setup() {
        const {proxy } = getCurrentInstance();
        console.log('Proxy.$Ics',proxy.$Ics)
        onMounted(() => {
            loadPlayer()
        })
        let player
        const loadPlayer = ()=>{
            console.log('我执行了')
            player = new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                autoplay: true,
                cover: '<your cover URL>',//可选公共参数。视频封面图片地址。用户自定义的可以被访问到的网络图片。本参数传入的URL优先级最高，会覆盖通过获取视频播放凭证接口获取的CoverURL。
                // 播放方式一、播放地址播放。此方式播放优先级最高。
                source : 'webrtc://192.168.192.145:5101/bjyf/test',//播放方式一必选参数。可以是第三方直播或点播地址、阿里云直播服务中的播放地址，或阿里云点播服务中的播放地址。
                // 播放方式二：推荐点播用户使用
                vid : '<your video ID>',//播放方式二必选参数。可以通过点播控制台（媒资库>音/视频路径）查询。示例：1e067a2831b641db90d570b6480f****。
                playauth : '<your PlayAuth>',//播放方式二必选参数。参数值可通过调用GetVideoPlayAuth接口获取。
                encryptType: 1, //使用播放方式二，当播放私有加密流时需要设置本参数值为1。其它情况无需设置。
                // 播放方式三：仅MPS用户使用
                vid : '<your media ID in MPS>',//播放方式三必选参数。可以通过媒体处理控制台（媒体管理>媒体列表路径）查询。示例：1e067a2831b641db90d570b6480f****。
                accId: '<your AccessKey ID>',//播放方式三必选参数。可通过RAM控制台（AccessKey管理页面）创建AccessKey，或者查看已有AccessKey Id的AccessKey Secret。
                accSecret: '<your AccessKey Secret>',//播放方式三必选参数。
                stsToken: '<your STS token>',//播放方式三必选参数。视频播放的临时凭证。凭证需要提前生成。生成方式请参考视频播放。
                domainRegion: '<your domain region>',//播放方式三必选参数。媒体资源所在的区域（cn-shanghai，cn-hangzhou等）。
                authInfo: '<your auth info>',//播放方式三必选参数。authInfo需要提前生成。生成方式请参考视频播放。
                // 播放方式四：使用STS方式播放。点播用户可在播放方式二或播放方式四中选择一个使用。
                vid : '<your video ID>',//播放方式四必选参数。可以通过点播控制台（媒资库>音/视频路径）查询。示例：1e067a2831b641db90d570b6480f****。
                accessKeyId: '<your AccessKey ID>',//播放方式四必选参数。可通过RAM访问控制控制台的AccessKey管理页面创建AccessKey，或者查看已有AccessKey Id的AccessKey Secret。
                securityToken: '<your STS token>',//播放方式四必选参数。视频播放的临时凭证。凭证需要提前生成。生成方式请参考创建角色并进行STS临时授权。
                accessKeySecret: '<your AccessKey Secret>',//播放方式四必选参数。可通过RAM访问控制控制台的AccessKey管理页面创建AccessKey，或者查看已有AccessKey Id的AccessKey Secret。
                region: '<region of your video>', // 播放方式四必选参数。媒体资源所在的区域。如cn-shanghai、eu-central-1, ap-southeast-1等。
                // 播放方式五：使用DRM方式播放。只有DRM加密视频能使用。
                isDrm: true,
                vid: '<your video ID>',//播放方式五必选参数。可以通过点播控制台（媒资库>音/视频路径）查询。示例：1e067a2831b641db90d570b6480f****。
                accessKeyId: '<your AccessKey ID>',//播放方式五必选参数。可通过RAM访问控制控制台的AccessKey管理页面创建AccessKey，或者查看已有AccessKey Id的AccessKey Secret。
                securityToken: '<your STS token>',//播放方式五必选参数。视频播放的临时凭证。凭证需要提前生成。生成方式请参考创建角色并进行STS临时授权。
                accessKeySecret: '<your AccessKey Secret>',//播放方式五必选参数。可通过RAM访问控制控制台的AccessKey管理页面创建AccessKey，或者查看已有AccessKey Id的AccessKey Secret。
                region: '<region of your video>', // 播放方式五必选参数。媒体资源所在的区域。如cn-shanghai、eu-central-1, ap-southeast-1等。
                certId: '<your certificate ID>', // 仅苹果设备播放需要。用于请求苹果证书，可根据DRM加密的实现到视频点播或视频直播控制台获取。
            })
        }
        const pause = ()=>{
            player.pause();
            console.log('暂停')
            //销毁播放器 参考文档：https://help.aliyun.com/document_detail/125572.html
            player.dispose();
        }
        return {
            loadPlayer,
            player,
            pause,
        }
    }
}
    
    

</script>
<style lang="less">

.prism-player{
    width:  800px !important;
    height: 600px !important;
}
</style>
