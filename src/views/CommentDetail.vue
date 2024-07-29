<template>
  <el-container>
    <el-header>评论详情</el-header>
    <el-main>
      <p>评论内容</p>
      <!-- 添加具体评论的内容展示逻辑 -->
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'CommentDetail',
  created() {
    const commentId = this.$route.params.id
    // 根据commentId加载具体的评论内容
  }
}
</script>

<style scoped>
.el-header {
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}
</style>
