<template>
  <el-container class="messages-container">
    <el-header>
      <el-button
        type="text"
        :class="{ active: currentMessageType === 'announcement' }"
        @click="setMessageType('announcement')"
      >
        站内公告
      </el-button>
      <el-button
        type="text"
        :class="{ active: currentMessageType === 'likes' }"
        @click="setMessageType('likes')"
      >
        收到的赞
      </el-button>
      <el-button
        type="text"
        :class="{ active: currentMessageType === 'replies' }"
        @click="setMessageType('replies')"
      >
        回复我的
      </el-button>
    </el-header>
    <el-main class="fix-el-main">
      <el-card class="box-card">
        <div v-for="message in pagedMessages" :key="message.id" :class="messageClass">
          <div v-if="currentMessageType === 'announcement'" class="announcement-message">
            <div class="announcement-info">
              <span class="announcement-index">#{{ message.id }}</span>
              <div class="announcement-content">
                <span>{{ message.title }}</span>
                <span class="time">{{ message.time }}</span>
              </div>
              <el-button @click.stop="showAnnouncement(message)" class="view-button"
                >查看</el-button
              >
            </div>
            <el-divider></el-divider>
          </div>
          <div v-else-if="currentMessageType === 'likes'" class="likes-message">
            <div class="links-info">
              <div class="links-icon">
                <el-avatar :src="message.avatar" />
              </div>
              <div class="likes-content">
                <p>{{ message.user }} 赞了我的动态</p>
                <p class="time">{{ message.time }}</p>
              </div>
              <el-button @click="navigateToVideo(message.videoId)" class="view-button"
                >查看</el-button
              >
            </div>
            <el-divider></el-divider>
          </div>
          <div v-else-if="currentMessageType === 'replies'" class="replies-message">
            <div class="links-info">
              <div class="links-icon">
                <el-avatar :src="message.avatar" />
              </div>
              <div class="likes-content">
                <p>{{ message.user }} 回复了我的评论: {{ message.reply }}</p>
                <p class="time">{{ message.time }}</p>
              </div>
              <el-button @click="navigateToVideo(message.videoId)" class="view-button"
                >查看</el-button
              >
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="messages.length"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-main>

    <!-- 详细信息对话框 -->
    <v-dialog v-model="dialogVisible" max-width="600px">
      <v-card>
        <v-card-title>详细信息</v-card-title>
        <v-card-text>
          <p>{{ selectedMessage.content }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialogVisible = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currentMessageType: 'announcement',
      messages: [],
      dialogVisible: false,
      selectedMessage: {},
      currentPage: 1,
      pageSize: 6 // 设置每页6个消息
    }
  },
  computed: {
    messageClass() {
      switch (this.currentMessageType) {
        case 'announcement':
          return 'announcement-message'
        case 'likes':
          return 'likes-message'
        case 'replies':
          return 'replies-message'
        default:
          return ''
      }
    },
    pagedMessages() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.messages.slice(start, end)
    }
  },
  created() {
    this.loadMessages()
  },
  methods: {
    setMessageType(type) {
      this.currentMessageType = type
      this.loadMessages()
    },
    loadMessages() {
      switch (this.currentMessageType) {
        case 'announcement':
          this.messages = [
            {
              id: 1,
              title: '测试公告1',
              content: '这是测试公告1的详细内容',
              time: '2024-07-01 12:00'
            },
            {
              id: 2,
              title: '测试公告2',
              content: '这是测试公告2的详细内容',
              time: '2024-07-02 14:00'
            },
            {
              id: 3,
              title: '测试公告3',
              content: '这是测试公告3的详细内容',
              time: '2024-07-03 16:00'
            },
            {
              id: 4,
              title: '测试公告4',
              content: '这是测试公告4的详细内容',
              time: '2024-07-04 18:00'
            },
            {
              id: 5,
              title: '测试公告5',
              content: '这是测试公告5的详细内容',
              time: '2024-07-05 20:00'
            },
            {
              id: 6,
              title: '测试公告6',
              content: '这是测试公告6的详细内容',
              time: '2024-07-06 22:00'
            },
            {
              id: 7,
              title: '测试公告7',
              content: '这是测试公告7的详细内容',
              time: '2024-07-07 23:00'
            }
          ]
          break
        case 'likes':
          this.messages = [
            {
              id: 1,
              user: '枫以风',
              avatar: 'https://placehold.co/50x50',
              time: '2024年7月10日 16:16',
              videoId: 1
            },
            {
              id: 2,
              user: '枫以风',
              avatar: 'https://placehold.co/50x50',
              time: '2024年7月10日 16:16',
              videoId: 2
            }
          ]
          break
        case 'replies':
          this.messages = [
            {
              id: 1,
              user: '会脸红的可达鸭',
              avatar: 'https://placehold.co/50x50',
              reply: '回复了我的评论',
              time: '2024年7月22日 12:21',
              videoId: 1
            },
            {
              id: 2,
              user: '会脸红的可达鸭',
              avatar: 'https://placehold.co/50x50',
              reply: '回复了我的评论',
              time: '2024年7月22日 12:21',
              videoId: 2
            }
          ]
          break
      }
    },
    handleMessageClick(message) {
      if (this.currentMessageType !== 'announcement') {
        this.selectedMessage = message
        this.dialogVisible = true
      }
    },
    showAnnouncement(message) {
      this.selectedMessage = message
      this.dialogVisible = true
    },
    navigateToComment(commentId) {
      this.$router.push({ name: 'CommentDetail', params: { id: commentId } })
    },
    navigateToVideo(videoId) {
      this.$router.push({ name: 'VideoPlayer', params: { id: videoId } })
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.fix-el-main {
  margin-top: 15px;
  padding: 0px;
}

.el-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background-color: #e0e0e0; /* 加深背景颜色 */
}

.el-header .el-button {
  font-size: 16px;
  padding: 10px 20px;
}

.el-header .el-button.active {
  font-weight: bold;
  color: #409eff;
  background-color: #fff;
  border-radius: 4px;
}

.box-card {
  min-height: 300px;
}

.announcement-message .announcement-info,
.likes-message .likes-info .replies-message {
  display: flex;
  align-items: center;
}

.announcement-index {
  margin-right: 10px;
}

.announcement-content,
.likes-content {
  flex: 1;
}

.links-info {
  display: flex;
  align-items: center;
}

.links-icon {
  margin-right: 10px;
}

.time {
  display: block;
  font-size: 12px;
  color: gray;
}

.view-button {
  margin-left: 10px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
