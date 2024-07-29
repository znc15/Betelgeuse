<template>
  <v-card class="mt-4">
    <v-card-title>评论</v-card-title>
    <v-list>
      <v-list-item v-if="comments.length === 0" class="no-comments">
        当前评论区还是孤岛哦，快来评论吧
      </v-list-item>
      <v-list-item v-for="comment in comments" :key="comment.id" class="comment-item">
        <v-list-item-avatar>
          <v-avatar size="32">
            <img src="https://dn-qiniu-avatar.qbox.me/avatar/" alt="avatar" />
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="comment-author">{{ comment.author }}</v-list-item-title>
          <v-list-item-subtitle>{{ comment.text }}</v-list-item-subtitle>
          <div class="comment-details">
            <span class="comment-date">{{ comment.date }}</span>
            <span class="comment-actions">
              <i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;{{ comment.likes }}&nbsp;&nbsp;
              <span @click="replyToComment(comment)">回复</span>
            </span>
          </div>
          <v-list class="reply-list">
            <v-list-item v-for="reply in comment.replies" :key="reply.id" class="reply-item">
              <v-list-item-avatar>
                <v-avatar size="32">
                  <img src="https://dn-qiniu-avatar.qbox.me/avatar/" alt="avatar" />
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="comment-author">{{ reply.author }}</v-list-item-title>
                <v-list-item-subtitle>@{{ comment.author }} {{ reply.text }}</v-list-item-subtitle>
                <div class="comment-details">
                  <span class="comment-date">{{ reply.date }}</span>
                  <span class="comment-actions">
                    <i class="fas fa-thumbs-up"></i>&nbsp;&nbsp;{{ reply.likes }}&nbsp;&nbsp;
                    <span @click="replyToComment(reply)">回复</span>
                  </span>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <post-comment
            v-if="comment.replying"
            @post-comment="addReply(comment)"
            :placeholder="'回复@' + comment.author"
            class="reply-comment"
          ></post-comment>
        </v-list-item-content>
        <v-divider class="custom-divider"></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import PostComment from '@/components/PostComment.vue'

export default {
  name: 'CommentList',
  components: {
    PostComment
  },
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  methods: {
    replyToComment(comment) {
      this.$emit('reply', comment)
      comment.replying = true
    },
    addReply(comment, replyText) {
      comment.replies.push({
        id: comment.replies.length + 1,
        author: '当前用户',
        text: replyText,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      })
      comment.replying = false
    }
  }
}
</script>

<style scoped>
.comment-item {
  display: flex;
  align-items: flex-start;
  padding: 10px 0;
}

.reply-item {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  padding-left: 40px;
}

.comment-author {
  font-weight: bold;
}

.comment-details {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
}

.comment-details .comment-date {
  margin-right: 10px;
}

.comment-actions {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.comment-actions i {
  margin-right: 5px;
}

.reply-comment {
  width: 100%;
  margin-top: 10px;
}

.custom-divider {
  border-width: thin 0px 1px 9999px;
}

.no-comments {
  padding: 20px;
  color: gray;
  text-align: center;
}
</style>
