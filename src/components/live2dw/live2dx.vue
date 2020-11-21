<template>
    <remote-js :src="data.cdnPath+'live2dw/lib/L2Dwidget.min.js'"></remote-js>
</template>

<script>

export default {
    name: "Live2dw",
    props: {
        data: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            live2dwList: {
                "chitose": "chitose",
                "epsilon2_1": "Epsilon2.1",
                "gf": "Gantzert_Felixander",
                "haru_1": "haru01",
                "haru_2": "haru02",
                "haruto": "haruto",
                "hijiki": "hijiki",
                "izumi": "izumi",
                "koharu": "koharu",
                "miku": "miku",
                "ni-j": "ni-j",
                "nico": "nico",
                "nietzsche": "nietzche",
                "nipsilon": "nipsilon",
                "nito": "nito",
                "rem": "rem",
                "shizuku": "shizuku",
                "tororo": "tororo",
                "tsumiki": "tsumiki",
                "unitychan": "unitychan",
                "wanko": "wanko",
                "z16": "z16"
            }
        }
    },
    components: {
        'remote-js': {
            render(createElement) {
                return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
            },
            props: {
                src: {type: String, required: true}
            }
        }
    },
    methods: {
        init() {
            if (window.L2Dwidget != null) {
                window.L2Dwidget.init({
                    pluginRootPath: this.data.cdnPath + 'live2dw/',
                    pluginJsPath: 'lib/',
                    pluginModelPath: 'live2d-widget-model-' + this.data.type + '/assets/',
                    tagMode: false,
                    debug: false,
                    model: {
                        jsonPath:
                            this.data.cdnPath +
                            'live2dw/live2d-widget-model-' + this.data.type +
                            '/assets/' + this.live2dwList[this.data.type] + ".model.json"
                    },
                    display: {
                        position: this.data.position,
                        width: this.data.width,
                        height: this.data.height,
                        hOffset: this.data.hOffset,
                        vOffset: this.data.vOffset
                    },
                    mobile: {
                        show: true
                    },
                    log: false
                })
            } else {
                setTimeout(this.init, 200)
            }
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style scoped>

</style>
