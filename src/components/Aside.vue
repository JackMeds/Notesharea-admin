<template>
  <el-row class="tac">
    <el-col :span="24">
      <h3 class="mb-2 mt-2">Notesharea管理系统</h3>
      <el-menu router active-text-color="#ffd04b" background-color="#47535e" default-active="2" text-color="#fff">
        <el-menu-item index="/dashboard">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>统计图表</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Avatar />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/user">用户列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon>
            <span>笔记管理</span>
          </template>
          <el-menu-item index="/notes">笔记列表</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: "Aside",
  }
</script>
<style scoped>
  .mb-2.mt-2 {
    text-align: center;
    font-size: 19px;
    color: azure;
    line-height: 46px;
  }
  .el-menu{
    border-right: 0px;
  }
</style>