<template>    
    <transition name="fade">
        <div class="cover">
            <div class="main">
                <p>{{msgDialog}}</p>
                <div class="btns">
                    <p @click="callbacks[0]" class="btn-cancel">我再想想</p>
                    <p @click="callbacks[1]" class="btn-sure">确定</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Dialog',
        props: {
            msgDialog:String,
            callbacks: {
                type: Array,
                default() {
                    return [() => {}, () => {}];
                }
            },
        },
    };
</script>
<style rel="stylesheet/css" scoped>
    html,body{
        height: 100%;
    }
    .cover{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.5);
        z-index: 101;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.25s linear;
    } 
    .main{
        position: absolute;
        width: 246px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
        background: #FFFFFF;
        border-radius: 14px;
        overflow: hidden;
    }
    .main>p{
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: center;
        padding: 20px 10px;
        border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch; 
		border-style: solid;
		border-width: 0 0 1px 0;
    }
    .btns{
        display: flex;       
    }
    .btns p{
        width: 50%;
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        color: #999999;
    }
    .btns .btn-cancel{
        border-image: url(data:image/gif;base64,R0lGODlhBQAFAPABANra2v///yH5BAUHAAEALAAAAAAFAAUAAAIHhB9pGatnCgA7) 2 stretch; 
		border-style: solid;
		border-width: 0 1px 0 0;
    }
    .btns .btn-sure{
        color: #FF8800;
    }
</style>