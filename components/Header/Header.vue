<template>
    <div class="hd-co wi-100" :class="{'hd-ios': isIOS, 'hd-ip-x': isIPhoneX, 'hd-co-hid': !visible, 'sld': solid}">
        <!-- lvHeader-main这个类名是为了兼容下载banner -->
        <header class="hd-ma wi-100 lvHeader-main" :class="{'hd-hid': !visible}">
            <!-- iPhone 20px -->
            <div class="hd-fi wi-100" v-if="isIOS"></div>
            <div class="hd-ct wi-100">
                <span class="hd-ba" v-on:click="backCheck($event)" v-show="showBack">
                    <i></i>
                </span>
                {{title}}
                <slot></slot>
            </div>
        </header>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                isIOS: false,
                isIPhoneX: false,
                isAndroid: false,
            };
        },
        mounted() {
            const ua = navigator.userAgent;
            this.isAndroid = ua.indexOf('Android') > -1;
            this.isIOS = ua.indexOf('iPhone OS') > -1 || ua.indexOf('iPad') > -1;
            this.isIPhoneX =
                ua.indexOf('iPhone OS') > -1 &&
                (
                    (screen.width === 375 && screen.height === 812) || (screen.width === 414 && screen.height === 896)
                );
        },
        props: {
            // 头部是否可见
            visible: {
                type: Boolean,
                default: true
            },

            // 头部文字
            title: {
                type: String,
                default: ''
            },

            // 点击返回按钮的回调
            backCheck: {
                type: Function,
                default: e => {
                    e.stopPropagation();
                    window.NativeUtil ? NativeUtil.goBack() : history.back();
                }
            },

            // 是否展示返回按钮
            showBack: {
                type: Boolean,
                default: true
            },

            // 是否会占用位置
            solid: {
                type: Boolean,
                default: true
            }
        }
    };
</script>

<style scoped>
    .wi-100 {
        width: 100%;
    }

    .hd-co.sld {
        height: 44px;
    }

    .hd-co.sld.hd-ios {
        height: 64px;
    }

    .hd-co.sld.hd-ip-x {
        height: 88px;
    }

    .hd-ma {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 11;
        transition: background-color 0.2s ease;
        background-color: #fff;
        font-size: 18px;
        color: #333;
    }

    .hd-fi {
        height: 20px;
    }

    .hd-ip-x .hd-fi {
        height: 44px;
    }

    .hd-ct {
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .hd-hid,
    .hd-co-hid {
        background-color: transparent !important;
        pointer-events: none;
    }

    .hd-ba {
        position: absolute;
        height: 44px;
        width: 45px;
        left: 0;
        top: 0;
        z-index: 11;
    }

    .hd-hid .hd-ba {
        width: 60px;
        pointer-events: all;
    }

    .hd-ba>i {
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    .hd-ba>i:after {
        content: '';
        background: url(./ic-bc-gr.png) center center no-repeat;
        background-size: 10px;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 0;
        left: 0;
    }

    .hd-hid .hd-ba>i {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .hd-hid .hd-ba>i:after {
        background: url(./ic-bc-wh.png) center center no-repeat;
        background-size: 10px;
    }
</style>