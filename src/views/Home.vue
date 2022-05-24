<template>
  <el-container>
    <el-header height="80px">
      <el-row :gutter="20">
        <el-col :span="4"
          ><img src="../assets/logo.png" alt="" class="logo"
        /></el-col>
        <el-col :span="16"><h2>后台系统</h2></el-col>
        <el-col :span="4" class="btn-text"
          ><el-button type="text">Charles</el-button></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="active"
          text-color="#fff"
        >
        <!-- :default-active="active" -->
          <el-menu-item
            v-for="item in list"
            :key="item.path"
            :index="item.path"
          >
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter,useRoute } from "vue-router";
export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const rouer = useRoute()
    // 拿到所有路由实例
    const list = router.getRoutes().filter((v) => v.meta.isShow);
    return {
      list,
      active:rouer.path
    };
  },
});
</script>

<style lang="scss" scoped>
.logo {
  height: 80px;
  text-align: center;
}
h2 {
  text-align: center;
  color: #fff;
  line-height: 80px;
}
.btn-text {
  text-align: right;
  line-height: 80px;
  .el-button--text {
    color: #fff;
  }
}
.el-header {
  background: #545c64;
}
.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
    overflow:auto;
  }
}
.el-main{
  height: calc(100vh - 80px);
}
</style>
