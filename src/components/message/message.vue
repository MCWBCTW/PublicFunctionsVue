<template>
    <transition name="msg">
        <div class="message" v-show="flag">

        </div>
    </transition>
</template>


<script lang="ts" setup>
    import { createVNode, render } from 'vue'
    let flag : Ref<boolean> = ref(false);

    setTimeout(() => {
        flag.value = true;
    }, 2000)

    
</script>


<style scoped>
    .message {
        width: 200px;
        height: 50px;
        background-color: red;
        position: relative;
        top: 20px;
        left: 50%;
    }

    .msg-enter-active,
    .msg-leave-active {
        transition: opacity 0.5s ease;
    }

    .msg-enter-from,
    .msg-leave-to {
        opacity: 0;
    }
</style>