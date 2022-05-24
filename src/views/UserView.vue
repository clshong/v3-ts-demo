<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="selectData.nikeName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="selectData.role" class="m-2" placeholder="请选择角色">
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table border :data="list" style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nikeName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="i in scope.row.role"
            :key="i.role"
            text
            size="small"
          >
            {{ i.roleName }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button type="text" text size="small" @click="eidfun(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="Shipping address" v-model="isShow">
    <el-form :model="active">
      <el-form-item label="姓名" label-width="50px">
        <el-input
          placeholder="请输入姓名"
          v-model="active.nikeName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="角色" label-width="50px">
        <el-select multiple v-model="active.role" placeholder="请选择角色">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="userChange">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { InitData, ListInt } from "../types/user";
import { getUserList, getRoleList } from "../utils/api";
export default defineComponent({
  setup() {
    const state = reactive(new InitData());
    onMounted(() => {
      getUserList().then((res) => {
        state.list = res.data;
        state.listData = res.data;
      });
      getRoleList().then((res) => {
        state.roleList = res.data;
      });
    });
    const onSubmit = () => {
      let arr: [ListInt][] = [];
      //通过标题条件查找元素
      if (state.selectData.nikeName || state.selectData.role) {
        if (state.selectData.nikeName) {
          arr = state.listData.filter(
            (v: any) => v.nikeName.indexOf(state.selectData.nikeName) !== -1
          );
        }
        if (state.selectData.role) {
          arr = (state.selectData.nikeName ? arr : state.listData).filter(
            (v: any) =>
              v.role.find((i: any) => i.role === state.selectData.role)
          );
        }
      } else {
        // 空直接返回全部数据
        arr = state.listData;
      }
      state.list = arr;
    };
    const eidfun = (row: ListInt) => {
      state.active = {
        id:row.id,
        userName:row.userName,
        nikeName:row.nikeName,
        role:row.role.map((v:any) => v.role || v.roleId) 
      };
      state.isShow = true;
    };
    const userChange = () =>{
      const obj:any = state.list.find((v:any) =>v.id === state.active.id) 
      obj.nikeName = state.active.nikeName
      obj.role = state.roleList.filter( (v:any) => state.active.role.indexOf(v.roleId) !== -1 )
      state.isShow = false
    }
    return {
      ...toRefs(state),
      onSubmit,
      eidfun,
      userChange
    };
  },
});
</script>

<style scoped lang="scss">
</style>
