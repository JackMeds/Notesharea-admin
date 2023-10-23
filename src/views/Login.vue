<template lang="">
  <div class="login-box">
    <el-row class="row-bg" justify="center">
      <el-col :span="6">
        <h2>Notesharea管理系统</h2>
      </el-col>
    </el-row>
    <el-row class="row-bg" justify="center">
      <el-col :span="6">
        <el-form :model="Form">
          <el-form-item>
            <el-input placeholder="输入用户名" v-model="username" />
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="输入密码"
              v-model="password"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from "vue"; //导入ref函数
import { useRouter } from "vue-router"; // 引入useRouter
import CryptoJS from "crypto-js"; // 导入CryptoJS

const { proxy } = getCurrentInstance();
const router = useRouter();

const onRegister = () => {
  router.push("/register");
};
const username = ref("");
const password = ref("");

const onSubmit = () => {
  const hashedData = ref("");
  hashedData.value = CryptoJS.SHA256(password.value).toString();
  console.log(password.value);
  proxy.$http
    .post("http://localhost:3000/api/admin/login", {
      userName: username.value,
      password: password.value,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.code == 0) {
        window.sessionStorage.setItem("admininfo",username.value)
        window.sessionStorage.setItem("adminId", response.data.data.id)
        alert("登录成功");
        router.push("/home");
      } else {
        alert("用户名或密码错误");
      }
    });
};
</script>
<style scoped>
.login-box {
  text-align: center;
  background-color: #47535e;
  width: 100%;
  height: 100vh;
  color: azure;
}

.login-box h2 {
  line-height: 100px;
  font-size: 30px;
  margin-top: 300px;
}

.login-box .el-button {
  width: 100%;
}
</style>
