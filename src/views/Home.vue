<template>
  <el-container>
    <el-aside width="200px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header><Header/></el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // @ is an alias to /src
  import Aside from '@/components/Aside.vue'
  import Header from '@/components/Header.vue'

  export default {
    name: 'Home',
    components: {
      Aside,Header
    }
  }
</script>
<style scoped>

  .el-aside {
    background-color: #47535e;
    height: 100vh;
  }

  .el-header {
    background-color: rgb(255, 255, 255);
    padding-left: 0;
    padding-right: 0;
  }

  .el-main {
    background-color: rgb(255, 255, 255);
  }
</style>