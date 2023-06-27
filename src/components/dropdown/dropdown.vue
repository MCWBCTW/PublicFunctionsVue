<template>
    <div :class="[
        activeFlag ? 'active' : '',
        'medium',
        'dropdown'
    ]" @click="activeDropdown" @mouseenter="enterDropdown" @mouseleave="outDropDown">
        <input type="text" v-model="choiceLabel" :readonly="!query" class="label" :class="[query ? '' : 'query-label']"
            @input="labelInput" @blur.stop="labelBlur" @focus.stop="labelFocus">
        <div class="iconbox">
            <span v-show="!clear" class="iconfont icon-xiangxia icon-logo" :class="[activeFlag ? 'active-text' : 'static-text']"></span>

            <span v-show="clear && choiceLabel === ''" class="iconfont icon-xiangxia icon-logo" :class="[activeFlag ? 'active-text' : 'static-text']"></span>

            <span v-show="clear && choiceLabel !== '' && !dropdownHover" class="iconfont icon-xiangxia icon-logo" :class="[activeFlag ? 'active-text' : 'static-text']"></span>

            <span v-show="clear && choiceLabel !== '' && dropdownHover" class="iconfont icon-cha icon-logo" @click.stop="clearChoice"></span>
        </div>
        <div class="select" :class="[activeFlag ? 'show' : 'hidden']">
            <div class="select-box" @click.stop="() => {}">
                <div class="select-line" v-for="item in props.option" :key="item.id" @click="clickOption(item)" :class="[choiceId == item.id ? 'select-choice-text' : 'select-not-choice-text']">
                    <span class="select-item-left">{{ item.label }}</span>
                    <span class="select-item-right">{{ item.desc }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

    import { Ref, ref } from 'vue'
    interface Ioption {
        id: string;
        label: string;
        desc?: string;
    }
    const props = defineProps({
        // 下拉选项
        option: {
            type: Array<Ioption>,
            default: () => []
        },
        // 是否需要清除已选项功能
        clear: {
            type: Boolean,
            default: false,
        },
        // 是否需要查询功能
        query: {
            type: Boolean,
            default: false,
        }
    })

    const emit = defineEmits(['choiceOption'])

    

    // 下拉项鼠标移入
    let dropdownHover: Ref<boolean> = ref(false);

    // 鼠标移入下拉组件
    function enterDropdown(){
        if (props.clear) {
            dropdownHover.value = true;
        }
    }
    // 移除
    function outDropDown(){
        if (props.clear) {
            dropdownHover.value = false;
        }
    }


    // 激活下拉选项标志
    let activeFlag: Ref<boolean> = ref(false);
    // 输入框失去焦点状态
    let inputBlurFlag: boolean = true;
    // 开启或关闭下拉选项弹窗
    function activeDropdown(){
        if(!inputBlurFlag && activeFlag.value) {
            activeFlag.value = !activeFlag.value;
        } else if (!inputBlurFlag) {
            activeFlag.value = true;
        }
    }



    // 输入框输入
    function labelInput(){
        choiceLabel.value = '';
    }
    // 输入框失去焦点
    function labelBlur(){
        activeFlag.value = false;
        inputBlurFlag = true;
    }
    // 输入框聚焦
    function labelFocus(){
        setTimeout(() =>  {
            // 待打开弹窗后再修改状态，为了规避bug
            inputBlurFlag = false;
        }, 100)
        activeFlag.value = true;
    }



    // 选中的内容
    let choiceLabel: Ref<string> = ref('');
    // 选中项的id值
    let choiceId: Ref<string> = ref('');

    // 选择
    function clickOption(item: Ioption) {
        choiceLabel.value = item.label;
        choiceId.value = item.id;
        activeFlag.value = false;
        emit('choiceOption', item);
    }

    // 清除选择
    function clearChoice(){
        choiceLabel.value = '';
        emit('choiceOption');
    }
</script>


<style scoped>
    .dropdown {
        position: relative;
        border-radius: 4px;
        border: 1px solid #cecece;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .dropdown:hover {
        border-color: #aeaeae;
        cursor: pointer;
    }
    .medium {
        width: 250px;
        height: 35px;
    }
    .active {
        border-color: #409eff !important;
    }
    .label {
        font-size: 15px;
        width: 250px;
        height: 35px;
        padding: 0 40px 0 20px;
        box-sizing: border-box;
        line-height: 35px;
        border-radius: 4px;
        cursor: pointer;
        outline: none;
        border: none;
    }
    .query-label {
        /* 用以隐藏掉闪烁的光标 */
        color: transparent;
        text-shadow: 0 0 0 #606266;
        /* 颜色透明，以文字阴影实现文字展示 */
    }
    .iconbox {
        width: 40px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon-logo {
        display: inline-block;
        color: #cecece;
    }
    .active-text {
        transform: rotate(-180deg);
        transition: all .3s;
    }
    .static-text {
        transform: rotate(0deg);
        transition: all .3s;
    }
    .select {
        width: 100%;
        position: absolute;
        top: 40px;
        left: 0;
        border-radius: 4px;
        overflow: hidden;
        background-color: #ffffff;
    }
    .select-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        box-sizing: border-box;
        height: 200px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    .select-box::-webkit-scrollbar {
        width: 0;
    }
    .select-line {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px 10px;
        box-sizing: border-box;
    }
    .select-line:hover {
        background-color: #f5f7fa;
    }
    .select-item-left {
        width: 50%;
        font-size: 14px;
    }
    .select-choice-text {
        color: #409eff;
    }
    .select-not-choice-text {
        color: #606266;
    }
    .select-item-right {
        width: 50%;
        font-size: 14px;
        text-align: right;
    }
    .show {
        height: 200px;
        transition: all .3s;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .hidden {
        height: 0;
        transition: all .2s;
    }
</style>