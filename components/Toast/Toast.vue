<template>
    <transition name="fade">
        <div v-show="showToast" class="cover">
            <div class="main" :class="[(toastType=='delete')?'deleteToast':'']">
                <div v-show="faceName" :class="faceName"></div>
                <p>{{msgToast}}</p>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Toast',
        props: {
            showToast: false,
            faceName: '',
            msgToast: '',
            toastType: '',
        },
    };
</script>
<style rel="stylesheet/css" scoped>
    html,
    body {
        height: 100%;
    }

    .cover {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
        z-index: 999;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        align-items: center;
        align-content: center;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s linear;
    }

    .main {
        width: 492px;
        background: rgba(0, 0, 0, .8);
        overflow: hidden;
        padding: 20px;
        border-radius: 28px;
        animation-duration: 0.75s;
        animation-name: bounceIn;
    }

    @keyframes bounceIn {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        0% {
            opacity: 0;
            transform: scale3d(0.3, 0.3, 0.3);
        }

        20% {
            transform: scale3d(1.1, 1.1, 1.1);
        }

        40% {
            transform: scale3d(0.9, 0.9, 0.9);
        }

        60% {
            opacity: 1;
            transform: scale3d(1.03, 1.03, 1.03);
        }

        80% {
            transform: scale3d(0.97, 0.97, 0.97);
        }

        to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
    }

    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .animated.infinite {
        animation-iteration-count: infinite;
    }

    .main>div {
        height: 84px;
        margin-top: 40px;
    }

    .smile {
        background: url(../assets/smile-grey.png) center center no-repeat;
        background-size: 84px;
    }

    .sad {
        background: url(../assets/sad-big.png) center center no-repeat;
        background-size: 84px;
    }

    .main>p {
        font-size: 28px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        padding: 10px 0;
    }

    /* 删除弹框 */
    .deleteToast {
        width: 308px;
        padding: 50px 70px;
    }

    .deleteToast>div {
        display: none !important;
    }

    .deleteToast p {
        height: 100% !important;
        padding: 0 !important;
    }
</style>