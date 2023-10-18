<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>笔记列表</span>
        <el-input v-model="searchKeyword" class="searchbox" size="large" placeholder="请输入关键字" />
        <el-button type="primary" @click="dosearch" class="addbtn">搜索</el-button>
      </div>
    </template>
    <!-- 列表 -->

    <el-table style="width: 100%" :data="allNote" v-if="showTable" max-height="500">
      <el-table-column label="编号" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"> {{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="笔记名称" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"> {{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"> {{ scope.row.user.nickName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="笔记分类" width="350">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">
              {{ truncateText(scope.row.content, 50) }}
              <!-- 这里的50可以根据您的需求调整 -->
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button type="primary" @click="addToRecommended(scope.row.id)" class="addbtn" v-if="scope.row.recommendNotes.isRecommend == false
              ">添加到推荐笔记{{ scope.row.isRecommend }}</el-button>
            <el-button type="danger" @click="removeRecommended(scope.row.id)" class="addbtn" v-else>从推荐笔记中移除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页效果 -->
    <el-pagination background layout="prev, pager, next" />
  </el-card>
</template>
<script setup>
import { ref, inject, onMounted } from "vue"; //导入ref函数
import { useRouter } from "vue-router"; // 引入useRouter

const router = useRouter(); // 使用useRouter
const allNote = ref([]);
const http = inject("http"); // 使用inject获取http

//搜索笔记功能
const searchKeyword = ref(""); // 保存搜索关键字

const dosearch = () => {
  // 执行搜索操作
  const keyword = searchKeyword.value.toLowerCase(); // 获取搜索关键字，并转换为小写
  const filteredNotes = allNote.value.filter((note) => {
    // 使用正则表达式匹配标题，支持中文字符和字母
    const regex = new RegExp(keyword, "i"); // "i" 表示不区分大小写
    return regex.test(note.title.toLowerCase()); // 笔记标题包含关键字的才会被保留
  });
  // 更新笔记列表
  allNote.value = filteredNotes;
};

//添加到推荐笔记功能
const addToRecommended = (noteId) => {
  console.log(noteId);
  // 在这里触发将笔记添加到推荐笔记的逻辑
  const adminId = ref(window.sessionStorage.getItem("adminId"));
  const data = {
    adminId: adminId.value,
    noteId: noteId,
    // isRecommend:true,
  };
  http
    .post("/api/note/addRecommend", data)
    .then(() => {
      console.log("笔记已成功添加到推荐笔记。");
      findAllNotes(); // 刷新数据列表
    })
    .catch((err) => {
      console.error("无法添加到推荐笔记", err);
    });
};

//从推荐笔记中移除功能
const removeRecommended = (noteId) => {
  // 在这里触发将笔记添加到推荐笔记的逻辑
  const adminId = ref(window.sessionStorage.getItem("adminId"));
  const data = {
    adminId: adminId.value,
    noteId: noteId,
    // isRecommend:false,
  };
  http
    .patch("/api/note/removeRecommend", data)
    .then(() => {
      console.log("笔记已成功从推荐笔记中移除。");
      findAllNotes(); // 刷新数据列表
    })
    .catch((err) => {
      console.error("无法从推荐笔记中移除", err);
    });
};

//查询所有笔记
const isRecommend = ref(false);
const showTable = ref(false);

const findAllNotes = async () => {
  try {
    const response = await http.get("/api/note/allNotes");
    // console.log(response.data.data);

    allNote.value = response.data.data;
    allNote.value.map((note) => {
      if (
        note.recommendNote != null
      ) {
        // 如果recommendNotes是一个非空数组，取第一个元素
        note.recommendNotes = note.recommendNote;
      } else {
        // 如果recommendNotes是空数组或者不存在，设置为null或其他默认值
        note.recommendNotes = { noteId: null, isRecommend: false };
      }
    });
    console.log(allNote.value);
  } catch (err) {
    console.error(err);
  }

  //显示表格
  showTable.value = true;
};

onMounted(() => {
  findAllNotes();
});

//精简笔记文本框中的内容
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "…"; // 使用省略号代替
  }
  return text;
};

//制作添加到推荐笔记的功能
</script>
<style scoped>
.addbtn {
  margin-left: 20px;
}

.searchbox {
  width: 200px;
  margin-left: 20px;
}
</style>
