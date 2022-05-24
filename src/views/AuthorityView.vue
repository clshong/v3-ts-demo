<template>
  <el-button type="primary" @click="onSubmit">确认修改</el-button>
    <div>
       <el-tree
            ref="treeRef"
            :data="list"
            show-checkbox
            :check-strictly ="true"
            node-key="roleId"
            :default-checked-keys="authorityIds"
            :props="{
                 children: 'roleList',
                  label: 'name',
            }"
        /> 
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive,toRefs } from 'vue'
import {useRoute} from 'vue-router'
import {InitData} from '../types/authority'
import {getauthority} from '../utils/api'
export default defineComponent({
    setup () {
        const route = useRoute()
        const query:any = route.query;
        // 响应式数据
        const state = reactive(new InitData(query.id,query.authority))
        onMounted(()=>{
            getauthority().then(res=>{
                state.list = res.data
                console.log(state.authorityIds);
                
            })
        })

        const onSubmit = ()=>{
            console.log(state.treeRef.getCheckedKeys());
            alert("http提交")
        }
        return {
            ...toRefs(state),
            onSubmit,
        }
    }
})
</script>

<style scoped lang="scss">

</style>