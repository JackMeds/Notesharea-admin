<template>
  <div class="headerbox">
    <el-dropdown @command="loginout">
      <span class="el-dropdown-link">
        admin
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="loginout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
  export default {
    name: "Header",
    data() {
      return {
        username:"",
      }
    },
    mounted() {
      if(window.sessionStorage.getItem('admininfo')){
        this.username = window.sessionStorage.getItem('admininfo')
      }else{
        this.$router.push('/')
      }
    },
    methods: {
      loginout() {
        console.log('退出')
        window.sessionStorage.removeItem('admininfo')
        this.$router.push('/')
      }
    },
  }
</script>
<style scoped>
  .headerbox {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 99%;
    padding: 0 20px;
    background-color: #fff;
    border-bottom: 3px solid #cfcfcf;
  }

  .el-dropdown-link {
    color: #409eff;
    cursor: pointer;
  }

  .el-dropdown-link:focus {
    outline: none;
  }
</style>