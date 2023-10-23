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
            <el-input placeholder="注册姓名" v-model="userName" />
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="输入密码"
              v-model="password"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="确认密码" type="password" />
          </el-form-item>
          <el-form-item>
            <el-input placeholder="输入邮箱" v-model="email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toLogin"
              >已注册账号，点击登录</el-button
            >
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
const userName = ref("");
const password = ref("");
const email = ref("");
const plaintext = ref(""); // 输入要加密的文本

const toLogin = () => {
  router.push("/");
};

const register = () => {
  let passwordToSHA256 = password.value;
  passwordToSHA256 = CryptoJS.SHA256(password.value).toString(); // 对输入的密码进行加密
  //构造要发送的数据
  const data = {
    userName: userName.value,
    password: password.value,
    email: email.value,
  };
  console.log(data);
  //发送请求
  proxy.$http
    .post("http://localhost:3000/api/admin/adminRegister", data)
    .then((response) => {
      console.log(response.data);
      if(response.data.code == 0){
        alert("注册成功！")
        router.push("/");
      } else {
        alert("注册失败！")
      }
      // 请求成功后清空输入框的值
      userName.value = "";
      password.value = ""; // 清空密码输入框
      email.value = "";
    })
    .catch((error) => {
      console.log(error);
      // 请求成功后清空输入框的值
      userName.value = "";
      password.value = ""; // 清空密码输入框
      email.value = "";
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
