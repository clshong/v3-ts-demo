<template>
  <div>
    <!-- 搜索 -->
    <!-- <div class="select-box">
      <el-form :inline="true" :model="selectData" class="demo-form-inline">
        <el-form-item label="角色">
          <el-select
            v-model="selectData.roleName"
            class="m-2"
            placeholder="请选择角色"
          >
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in listData"
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
    </div> -->
    <div class="select-box">
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </div>
    <el-table border :data="list" style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="role" label="操作">
        <template #default="scope">
          <el-button @click="authorityChange(scope.row)" text size="small">
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-button text @click="open"></el-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import {useRouter} from 'vue-router'
import { getRoleList } from "../utils/api";
import { InitData, ListInt } from "../types/role";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  setup() {
    const state = reactive(new InitData());
    onMounted(() => {
      getRoleList().then((res) => {
        state.list = res.data;
        // state.listData = res.data;
      });
    });
    // 路由定义
     const router = useRouter()
    // 添加权限
    const addRole = () => {
      ElMessageBox.prompt("请输入角色名", "添加", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value) {
            state.list.push({
              roleName: value,
              roleId: state.list.length + 1,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: "添加成功",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    };
    //  修改权限
    const authorityChange = (row: ListInt) => {
      router.push({
        path:'authority',
        query:{
          id:row.roleId,
          authority:row.authority.join(',')
        }
      })
    };
    return {
      ...toRefs(state),
      addRole,
      authorityChange,
    };
  },
});
</script>

<style scoped lang="scss">
.select-box {
  margin-bottom: 20px;
}
</style>
