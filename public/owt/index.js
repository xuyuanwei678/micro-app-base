// Copyright © 2017 Intel Corporation. All Rights Reserved.
// 'use strict'; 
import { ElMessage } from 'element-plus'
import store from '@/store/index'
var res = {
    conference: new Owt.Conference.ConferenceClient(),
    publicationGlobal: null,
    screenpubGlobal: null,
    runSocketIOSample: null,
    localStream: null,
    is_audio_forbid: 'yes',
    role: 'normal',
    media: {
        mac_list: [],
        camera_list: []
    },
    audioConstraintsForMic: null,
    videoConstraintsForCamera: null,
    extensionId: null,
    streamconstraints: null,
    streamSourceInfo: null,
    avInfo: {
        audio: false,
        video: true,
        videoCodecs: ['vp8', 'h264'],
        pubOptions: [{codec: {name: 'h264'}, maxBitrate: 2048}]
    },
    isResolution: true,
    isLocalVideoFiled: false,
    myResolution: {
        width: 1920,
        height: 1080
    },
    basePath: null,
    myRoom: null,
    selfId: null,
    resp: null,
    cab: null
}

// 获取本地设备
var getMedia = (callback) => {
    try {
        navigator.mediaDevices.enumerateDevices().then((deviceList) => {
            res.media.camera_list = []
            res.media.mac_list = []

            for (var i = 0; i < deviceList.length; i++) {
                var dev = deviceList[i]

                if (dev.kind === 'audioinput') {
                    if (dev.kind.indexOf('扬声器') === -1) {
                        res.media.mac_list.push(dev)
                        
                    }
                }

                if (dev.kind === 'videoinput') {
                    res.media.camera_list.push(dev)
                    console.info(dev)
                }
            }
            
            store.commit('interact/setMedia',JSON.stringify(res.media))
            
            callback(res.media)

        });
    } catch (e) {
        console.error("获取设备失败")
    }
}

let createConstraints = (videoSource, audioSource) => {

    let frameRate = 30
    let Constraints = {
        videoConstraints: null,
        audioConstraints: null
    }

    if (audioSource) {
        Constraints.audioConstraints = new Owt.Base.AudioTrackConstraints(audioSource)
    }

    if (videoSource) {
        Constraints.videoConstraints = new Owt.Base.VideoTrackConstraints(videoSource)
        if (res.isResolution) {
            Constraints.videoConstraints.resolution = new Owt.Base.Resolution(res.myResolution.width, res.myResolution.height)
            Constraints.videoConstraints.frameRate = frameRate
        }
    }
    console.info(Constraints)
    return Constraints
}

let createStreamSourceInfo = () => {

    let streamSourceInfo
    if (res.audioConstraintsForMic && res.videoConstraintsForCamera) {
        res.streamconstraints = new Owt.Base.StreamConstraints(res.audioConstraintsForMic, res.videoConstraintsForCamera)
        streamSourceInfo = new Owt.Base.StreamSourceInfo(Owt.Base.AudioSourceInfo.MIC, Owt.Base.VideoSourceInfo.CAMERA)
    } else if (res.videoConstraintsForCamera) {
        res.streamconstraints = new Owt.Base.StreamConstraints(false, res.videoConstraintsForCamera)
        streamSourceInfo = new Owt.Base.StreamSourceInfo(void 0, Owt.Base.VideoSourceInfo.CAMERA)
        res.avInfo.audio = false
    } else if (res.audioConstraintsForMic) {
        res.streamconstraints = new Owt.Base.StreamConstraints(res.audioConstraintsForMic, false)
        streamSourceInfo = new Owt.Base.StreamSourceInfo(Owt.Base.AudioSourceInfo.MIC, void 0)
        res.avInfo.video = false
    } else {
        res.avInfo.video = false
        res.avInfo.audio = false
    }

    return streamSourceInfo
}

let getDevice = () => {

    let device = {
        camera_deviceId: null,
        mac_deviceId: null
    }
    if (res.media.camera_list.length > 0) {
        device.camera_deviceId = res.media.camera_list[0].deviceId
    }
    if (res.media.mac_list.length > 0) {
        device.mac_deviceId = res.media.mac_list[0].deviceId
    }

    return device
}

let setStreamInfo = (device) => {

    if (device.camera_deviceId === 'forbidden') {
        let Constraints = createConstraints(null, null)
        res.videoConstraintsForCamera = Constraints.videoConstraints
        res.avInfo.video = false
    } else if (device.camera_deviceId) {
        let Constraints = createConstraints(Owt.Base.VideoSourceInfo.CAMERA, null)
        res.videoConstraintsForCamera = Constraints.videoConstraints
        res.videoConstraintsForCamera.deviceId = device.camera_deviceId
        res.avInfo.video = true
    }

    if (device.mac_deviceId) {
        let Constraints = createConstraints(null, Owt.Base.AudioSourceInfo.MIC)
        res.audioConstraintsForMic = Constraints.audioConstraints
        res.audioConstraintsForMic.deviceId = device.mac_deviceId
    }

    res.streamSourceInfo = createStreamSourceInfo()
}

let publish = (publication) => {
    // 这里判断外界传过来的is_audio_forbid 也就是默认静音状态
    // 如果是yes 则如果当前用户不是 主席， 都执行静音方法
    if (res.is_audio_forbid === 'yes' && res.role !== 'presenter') {
        let params = {
            track: 'audio'
        }
        mediaPaused(res.myRoom, res.selfId, params, () => {
        }, res.basePath)
    }

    res.publicationGlobal = publication
    mixStream(res.myRoom, publication.id, function () {
        // 在加入房间的回调里面执行 整个方法回调
        res.cab(res.resp)
    }, res.basePath)

    publication.addEventListener('error', (err) => {
        console.error('Publication error: ' + err.error.message)
    })
}

let changeResolution = () => {
    if (!res.isLocalVideoFiled) {
        // 如果是4：3摄像头使用该分辨率
        res.myResolution.width = 640
        res.myResolution.height = 360
        console.info("1080分辨率设置失败，使用最小分辨率:" + JSON.stringify(res.myResolution))
        res.isLocalVideoFiled = true
    } else {
        res.isResolution = false
        res.myResolution.width = 0
        res.myResolution.height = 0
    }
    createLoaclStream()
}

let createStream = () => {

    Owt.Base.MediaStreamFactory.createMediaStream(res.streamconstraints).then(stream => {

        res.localStream = new Owt.Base.LocalStream(stream, res.streamSourceInfo)
        // $('video.local').get(0).srcObject = stream

        if (res.avInfo.video) {
            res.conference.publish(res.localStream, res.avInfo.pubOptions).then(publication => {
                publish(publication)
            })
        } else {
            res.conference.publish(res.localStream).then(publication => {
                publish(publication)
            })
        }
    }, err => {
        console.error(err)
        if (err.name === 'OverconstrainedError' || err.name === 'OverconstrainedErrornullnull') {
            changeResolution()
        } else if (res.isLocalVideoFiled) {
            console.warn("修改分辨率失败")
            res.isResolution = false
            createLoaclStream()
        } else {
            alert('暂无可用设备！')
            res.cab(res.resp)
        }
    })
}

let createLoaclStream = () => {

    getMedia(() => {
        setStreamInfo(getDevice())
        if (!res.avInfo.video && !res.avInfo.audio) {
            res.cab(res.resp)
        } else {
            createStream()
        }
    })

}

res.createScreen = (cab, fail, fail2) => {

    let screenConstraints = createConstraints(Owt.Base.AudioSourceInfo.SCREENCAST, Owt.Base.VideoSourceInfo.SCREENCAST)

    console.info("window.screen.height:" + window.screen.height)
    console.info("window.screen.width:" + window.screen.width)
    //暂时使用最大分辨率，如果出现问题使用电脑分辨率
    if (window.screen.height && window.screen.width) {
        screenConstraints.videoConstraints.resolution = new Owt.Base.Resolution(window.screen.width, window.screen.height)
        screenConstraints.videoConstraints.frameRate = 15
    }

    let screenStreamconstraints = new Owt.Base.StreamConstraints(screenConstraints.audioConstraints, screenConstraints.videoConstraints)
    screenStreamconstraints.extensionId = res.extensionId
    let screenstreamSourceInfo = new Owt.Base.StreamSourceInfo(Owt.Base.AudioSourceInfo.SCREENCAST, Owt.Base.AudioSourceInfo.SCREENCAST)
    //screenstreamSourceInfo.video.deviceId = 'screen-cast'
    Owt.Base.MediaStreamFactory.createMediaStream(screenStreamconstraints).then(screenStream => {
        console.info("屏幕共享:" + screenStream)
        res.screenStream = new Owt.Base.LocalStream(screenStream, screenstreamSourceInfo)
        $('video.screen').get(0).srcObject = screenStream
        res.conference.publish(res.screenStream, {codec: {name: 'vp9'}, maxBitrate: 1024}).then(screenPublish => {
            res.screenpubGlobal = screenPublish
            cab && cab(screenPublish)
            console.info(screenPublish)
        }).catch(fail2)
    }).catch(fail)
}

res.changeDevice = (camera_deviceId, mac_deviceId) => {

    res.publicationGlobal && res.publicationGlobal.stop()
    res.publicationGlobal = null

    let df = getDevice()
    let device = {
        camera_deviceId: camera_deviceId || df.camera_deviceId,
        mac_deviceId: mac_deviceId || df.mac_deviceId
    }

    setStreamInfo(device)
    createStream()
}

res.runSocketIOSample = function (opt, basePath, cab, vm) {

    try {
        

        createToken(opt.room, opt.user, opt.role, opt.origin, function (response) {
                var token = JSON.parse(response).result.token
                res.conference.join(token).then(resp => {

                        res.resp = resp
                        res.cab = cab
                        res.basePath = basePath
                        res.myRoom = opt.room
                        res.is_audio_forbid = opt.is_audio_forbid
                        res.role = opt.role
                        res.selfId = resp.self.id
                        // 加入房间后执行回调
                        sessionStorage.setItem('userInfo1', JSON.stringify({
                            id: resp.self.id,
                            user_name: opt.name,
                            user_id: opt.user,
                            token: opt.token,
                            role: opt.role
                        }))

                        function checkPermission(av, name, callback) {
                            navigator.permissions.query({name: name})
                                .then((permissionObj) => {

                                    if (permissionObj.state === "denied" && name === "microphone") {
                                        av.audio = false
                                    }

                                    if (permissionObj.state === "denied" && name === "camera") {
                                        av.video = false
                                    }

                                    console.log(permissionObj.state);
                                    if ("granted" !== permissionObj.state) {
                                        navigator.mediaDevices.getUserMedia({
                                            audio: av.audio,
                                            video: av.video
                                        }).then((mediaStream) => {
                                            mediaStream.getTracks().forEach((track) => {
                                                track.stop()
                                            })
                                            callback(permissionObj.state)
                                        }).catch((error) => {
                                            console.log(error)
                                            callback(permissionObj.state)
                                        });
                                    } else {
                                        callback(permissionObj.state)
                                    }
                                })
                                .catch((error) => {
                                    console.log('Got error :', error);
                                })
                        }

                        function handlePermission(video, audio, callback) {
                            let av = {
                                video: video,
                                audio: audio
                            }
                            if (av.audio && !av.video) {
                                checkPermission(av, 'microphone', (state) => {
                                    let audioState = state
                                    console.log('audioState :', audioState)
                                    callback()
                                })
                            } else if (av.video && av.audio) {
                                checkPermission(av, 'microphone', (state) => {
                                    let audioState = state
                                    console.log('audioState :', audioState)

                                    checkPermission(av, 'camera', (state) => {
                                        console.log('videoState :', state)
                                        callback()
                                    })
                                })
                            } else if (av.video && !av.audio) {
                                checkPermission(av, 'camera', (state) => {
                                    console.log('videoState :', state)
                                    callback()
                                })
                            } else {
                                callback()
                            }
                        }

                        function startLocal(callback) {
                            let options = {
                                showClose: true,
                                message: `无可用的音视频设备`,
                                duration: 1000 * 6,
                                type: 'error'
                            }
                            getMedia((media) => {
                                    res.avInfo.video = media.camera_list.length > 0 ? true : false
                                    res.avInfo.audio = media.mac_list.length > 0 ? true : false

                                    if (!res.avInfo.audio && res.avInfo.video) {
                                        options.message = '本地麦克风不可用，请检查本地设备'
                                        ElMessage(options)
                                    } else if (!res.avInfo.video && res.avInfo.audio) {
                                        options.message = '本地摄像头不可用，请检查本地设备'
                                        ElMessage(options)
                                    } else if (!res.avInfo.video && !res.avInfo.audio) {
                                        ElMessage(options)
                                    }

                                    callback(res.avInfo.video, res.avInfo.audio)
                                }
                            )
                        }

                        window.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
                        if (window.getUserMedia) {

                            startLocal((video, audio) => {
                                handlePermission(video, audio, () => {
                                    createLoaclStream()
                                })
                            })
                        }

                    }
                    ,

                    function (err) {
                        console.error('server connection failed:', err)
                        res.conference.leave()
                    }
                )
            },
            basePath
        )
    } catch
        (e) {
        console.error('server createToken failed:', err)
        res.conference.leave()
    }
}
export default res

