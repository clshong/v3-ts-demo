<template>
  <div class="login-box">
    <el-form
      ref="loginFromRef"
      :model="loginFrom"
      status-icon
      :rules="rules"
      label-width="70px"
      class="loginFrom"
    >
      <h1>后台管理系统</h1>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="loginFrom.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="loginFrom.password"
          type="password"
          autocomplete="off"
        />
         </el-form-item>
         <el-form-item>
        <el-button type="primary" class="sub-btn" @click="submitForm(loginFromRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue-demi"
import {InitData} from '../types/Login'
import type{FormInstance} from 'element-plus'
import {Login} from '../utils/api'
import {useRouter} from 'vue-router'
export default defineComponent({
  setup() {
    const state = reactive(new InitData());
    const router = useRouter()
    const rules = { 
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
        {
          min: 6,
          max: 24,
          message: "账号长度在6-24值之前",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 6,
          max: 24,
          message: "密码长度在6-24值之前",
          trigger: "blur",
        },
      ],
    };
    const submitForm = (loginFromRef:FormInstance) => {
      loginFromRef?.validate((valid:boolean)=>{
        if(valid){
          // alert('验证通过，发送请求')
        Login(state.loginFrom).then(res =>{
          // console.log(res);
        localStorage.setItem('token',res.data.token)
          router.push('/')
        })
        }
      })
    }
    return {
      ...toRefs(state),
      rules,
      submitForm
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  .loginFrom {
    width: 400px;
    padding: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    .sub-btn {
      width: 100%;
      margin-top: 20px;
    }
    h1 {
      text-align: center;
      margin: 20px 0;
    }
  }
}
</style>
