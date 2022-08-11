<!--
 * @Author: BlackJoken
 * @Date: 2022-01-11 10:02:56
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-01-18 10:11:12
-->
<template>
    <el-button @click="begin">开始推流</el-button>
    
    <video id="rtc_media_player" width="320" autoplay muted></video>
</template>

<script>
import {  getCurrentInstance } from 'vue';
export default {
    setup(){
        const rtcurl = 'webrtc://192.168.192.145:5100/bjyf/testvite'
        const begin = ()=>{
            $('#rtc_media_player').show();
            var sdk = null;
            // Close PC when user replay.
            if (sdk) {
                sdk.close();
            }
            sdk = new SrsRtcPublisherAsync();

            // User should set the stream when publish is done, @see https://webrtc.org/getting-started/media-devices
            // However SRS SDK provides a consist API like https://webrtc.org/getting-started/remote-streams
            $('#rtc_media_player').prop('srcObject', sdk.stream);
            // Optional callback, SDK will add track to stream.
            // sdk.ontrack = function (event) { console.log('Got track', event); sdk.stream.addTrack(event.track); };

            // https://developer.mozilla.org/en-US/docs/Web/Media/Formats/WebRTC_codecs#getting_the_supported_codecs
            sdk.pc.onicegatheringstatechange = function (event) {
                if (sdk.pc.iceGatheringState === "complete") {
                    $('#acodecs').html(SrsRtcFormatSenders(sdk.pc.getSenders(), "audio"));
                    $('#vcodecs').html(SrsRtcFormatSenders(sdk.pc.getSenders(), "video"));
                }
            };

            // For example: webrtc://r.ossrs.net/live/livestream
            var url = rtcurl;
            sdk.publish(url).then(function(session){
                $('#sessionid').html(session.sessionid);
                $('#simulator-drop').attr('href', session.simulator + '?drop=1&username=' + session.sessionid);
            }).catch(function (reason) {
                sdk.close();
                $('#rtc_media_player').hide();
                console.error(reason);
            });
        }
        return {
            begin,
        }
    }
}
</script>
<style scoped lang="less">

</style>