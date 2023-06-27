<template>
    <div class="btn" :class="[
        `btn-${type}`,
        size
    ]">
        <span :class="[
            `text-${type == '' ? 'black' : 'white'}`
        ]">
            <slot></slot>
        </span>
    </div>
</template>


<script setup lang="ts">
    const props = defineProps({
        /**
         * medium
         * small
         * mini
         */
        size: {
            type: String,
            default: 'medium'
        },
        /**
         * '' 普通按钮 白色
         * primary 主要按钮 蓝色 
         * success 成功按钮 绿色
         * info 信息按钮 灰色
         * warning 警告按钮 橙色
         * danger 危险按钮 红色
         */
        type: {
            type: String,
            default: ''
        }
    })
</script>


<style scoped>
    .btn {
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .btn- {
        background-color: #ffffff;
        border: 1px solid #dcdfe6;
    }
    .btn-:hover {
        background-color: rgba(64, 158, 255, .1);
        border: 1px solid #c6e2ff;
    }
    .btn-:hover .text-black {
        color: #409eff;
    }
    .btn-primary {
        background-color: #409eff;
        border: 1px solid #409eff;
    }
    .btn-primary:hover {
        background-color: rgba(64, 158, 255, .9);
    }
    .btn-success {
        background-color: #67c23a;
        border: 1px solid #67c23a;
    }
    .btn-success:hover {
        background-color: rgba(103, 194, 58, .9);
    }
    .btn-info {
        background-color: #909399;
        border: 1px solid #909399;
    }
    .btn-info:hover {
        background-color: rgba(144, 147, 153, .9);
    }
    .btn-warning {
        background-color: #e6a23c;
        border: 1px solid #e6a23c;
    }
    .btn-warning:hover {
        background-color: rgba(230, 162, 60, .9);
    }
    .btn-danger {
        background-color: #f56c6c;
        border: 1px solid #f56c6c;
    }
    .btn-danger:hover {
        background-color: rgba(245, 108, 108, .9);
    }
    .text-black {
        color: #606266;
    }
    
    .text-white{
        color: #ffffff;
    }
    .medium {
        padding: 10px 20px;
        font-size: 14px;
    }
    .small {
        padding: 9px 15px;
        font-size: 12px;
    }
    .mini {
        padding: 7px 15px;
        font-size: 12px;
    }
</style>