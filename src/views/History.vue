<template>
  <el-container class="history-container">
    <el-main class="history-main">
      <el-card class="history-card">
        <div v-for="(item, index) in pagedHistoryList" :key="item.id" class="history-item">
          <div class="history-details">
            <span class="history-index">#{{ index + 1 }}</span>
            <div class="history-info">
              <p class="history-title">{{ item.title }}</p>
              <p class="history-author">{{ item.author }} | {{ item.category }}</p>
              <p class="history-time">{{ item.time }}</p>
            </div>
            <el-button type="primary" @click="navigateToVideo(item.id)" class="view-button"
              >查看</el-button
            >
          </div>
          <el-divider></el-divider>
        </div>
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="pageSize"
            :total="totalItems"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      historyList: [
        {
          id: 1,
          time: '今天 17:06',
          title: '有沒有明白人指教我，卡成這樣半小時了，解除暫停就被警告暫停，也退不出去，逆天',
          author: '作為不與三子譽',
          category: '手機遊戲'
        },
        {
          id: 2,
          time: '今天 17:07',
          title: '你們說，下一個目的地去哪裡呢？',
          author: '青春葬奏',
          category: '日常'
        },
        {
          id: 3,
          time: '今天 17:07',
          title: '太吓人了，快提醒你的家人朋友',
          author: '湯圓當家族',
          category: '搞笑'
        },
        {
          id: 4,
          time: '今天 17:10',
          title: '少爷也来当辅警了',
          author: '肥人咖啡',
          category: '鬼畜调教'
        },
        {
          id: 5,
          time: '今天 17:17',
          title: '睡觉前 | 你们都在干嘛',
          author: '酷酷的M哥01',
          category: '明星人'
        }
      ]
    }
  },
  computed: {
    pagedHistoryList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.historyList.slice(start, end)
    },
    totalItems() {
      return this.historyList.length
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page
    },
    navigateToVideo(id) {
      this.$router.push({ name: 'VideoPlayer', params: { id } })
    }
  }
}
</script>

<style scoped>
.history-container {
  margin: 20px;
}

.history-main {
  padding: 0;
}

.history-card {
  padding: 20px;
}

.history-item {
  margin-bottom: 10px;
}

.history-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.history-index {
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
}

.history-info {
  flex: 1;
}

.history-title {
  font-size: 16px;
  font-weight: bold;
}

.history-author {
  font-size: 14px;
  color: gray;
}

.history-time {
  font-size: 12px;
  color: gray;
}

.view-button {
  background-color: white;
  color: black;
  border: 1px solid #dcdcdc;
  margin-left: 10px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
