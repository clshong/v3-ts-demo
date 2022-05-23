<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="selectData.title" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="详情">
          <el-input v-model="selectData.body" placeholder="请输入关键字">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="list[selectData.page]" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="body" label="详情" />
    </el-table>
    <el-pagination layout="prev, pager, next" :total="selectData.count" @current-change='currentChange'/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { InitData,ListInt} from "../types/order";
import { getList } from "../utils/api";
export default defineComponent({
  setup() {
    const state = reactive(new InitData());
    onMounted(() => {
      getList({ page: state.selectData.page }).then((res) => {
        // 赋值数量
       state.selectData.count = res.data.length
       state.dataList= res.data
       selectList(res.data)
      });
    });
    //数据分割
    const selectList = (arr:ListInt[]) =>{
      state.list = []
      for (let index = 0; index < arr.length; index+=10) {
        let list:any = arr.slice(index,index+10)
        state.list.push(list)
      }
    }
    const currentChange = (page:number) =>{
      state.selectData.page = page - 1
    }
    const onSubmit = ()=>{
      let arr:ListInt[] =[]
      //通过标题条件查找元素
      if(state.selectData.title || state.selectData.body){
        if(state.selectData.title){
        arr = state.dataList.filter( v =>v.title.indexOf(state.selectData.title) !== -1)
        }
        if(state.selectData.body){
          arr = (state.selectData.title? arr :state.dataList).filter( v =>v.body.indexOf(state.selectData.body) !== -1)
        }
      }
      else{
        // 空直接返回全部数据
        arr = state.dataList
      }
      state.selectData.count = arr.length
      selectList(arr)
    }
    return {
      ...toRefs(state),
      currentChange,
      onSubmit
    };
  },
});
</script>

<style scoped lang="scss"></style>
