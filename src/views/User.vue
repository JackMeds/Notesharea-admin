<template lang="">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户列表</span>
      </div>
    </template>
    <el-table :data="allUser" style="width: 100%" max-height="500">
      <el-table-column label="用户ID" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户性别" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px" v-if="scope.row.gender == 1"
              >男</span
            >
            <span style="margin-left: 10px" v-else-if="scope.row.gender == 2"
              >女</span
            >
            <span style="margin-left: 10px" v-else-if="scope.row.gender == 3"
              >保密</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户邮箱" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.email }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup>
import { ref, inject, onMounted } from "vue"; //导入ref函数
import { useRouter } from "vue-router"; // 引入useRouter

const router = useRouter(); // 使用useRouter
const allUser = ref([]);
const http = inject("http"); // 使用inject获取http

// 获取所有用户
const findAllUser = async () => {
  const res = await http.get("/api/user/allUsers");
  // console.log(res.data);查看获取的数据
  allUser.value = res.data;
};
onMounted(() => {
  findAllUser();
});
</script>
<style lang=""></style>
