<template>
  <v-card class="mt-4">
    <v-card-title>发布评论</v-card-title>
    <v-row class="mb-4 align-center plq-padding">
      <v-col cols="auto">
        <v-avatar size="32">
          <img src="https://dn-qiniu-avatar.qbox.me/avatar/" alt="avatar" />
        </v-avatar>
      </v-col>
      <v-col>
        <el-input
          v-model="comment"
          placeholder="请输入评论"
          clearable
          class="comment-input"
        ></el-input>
      </v-col>
      <v-col cols="auto" class="align-right">
        <el-button type="primary" @click="postComment" class="submit-btn">发布</el-button>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PostComment',
  props: {
    placeholder: {
      type: String,
      default: '请输入评论'
    }
  },
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    postComment() {
      this.$emit('post-comment', this.comment)
      this.comment = ''
    }
  }
}
</script>

<style scoped>
.align-center {
  display: flex;
  align-items: center;
}
.plq-padding {
  padding: 15px;
}
.comment-input {
  width: 100%;
}
.align-right {
  display: flex;
  justify-content: flex-end;
}
.submit-btn {
  color: white;
}
</style>
