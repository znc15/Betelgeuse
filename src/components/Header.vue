<template>
  <v-app-bar app flat>
    <v-btn icon @click="$emit('toggle-sidebar')">
      <v-icon>
        <i class="fas fa-bars"></i>
      </v-icon>
    </v-btn>
    <v-toolbar-title class="hidden-sm-and-down">LittleSheep Video</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="search-container hidden-sm-and-down">
      <el-input placeholder="搜索" class="search-bar">
        <template #prefix>
          <i class="fas fa-search"></i>
        </template>
      </el-input>
    </div>
    <div class="avatar-container">
      <v-btn icon @click="goToUserProfile">
        <v-avatar size="32">
          <img src="https://dn-qiniu-avatar.qbox.me/avatar/" alt="avatar" />
        </v-avatar>
      </v-btn>
      <el-button type="text" class="hidden-sm-and-down msg-btn" @click="navigateToMessages"
        >消息</el-button
      >
      <el-button type="text" class="hidden-sm-and-down history-button" @click="navigateToHistory"
        >历史</el-button
      >
      <v-btn
        class="mode-toggle-btn"
        :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }"
        @click="toggleDarkMode"
      >
        {{ isDarkMode ? '白天模式' : '黑夜模式' }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    goToUserProfile() {
      this.$router.push({ name: 'UserProfile' })
    },
    navigateToMessages() {
      this.$router.push({ name: 'Messages' })
    },
    navigateToHistory() {
      this.$router.push({ name: 'History' })
    },
    toggleDarkMode() {
      this.$emit('toggle-dark-mode')
    }
  }
}
</script>

<style scoped>
.v-app-bar {
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
}

.avatar-container {
  display: flex;
  align-items: center;
}

.msg-btn {
  margin-left: 9px;
}

.v-avatar {
  margin-right: 9px;
}

.history-button {
  margin-right: 15px;
}

.mode-toggle-btn {
  background-color: #ff4081; /* Deepened pink */
  color: white;
  font-weight: bold;
  margin-right: 16px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.dark-mode {
  background-color: #333;
  color: white;
}

.light-mode {
  background-color: #ff4081;
  color: white;
}

.search-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 400px;
  max-width: 100%;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.search-bar .el-input__inner {
  border: none;
  border-radius: 25px;
}

.search-bar .el-input__inner::placeholder {
  color: #999;
}

@media (max-width: 600px) {
  .v-app-bar {
    padding-right: 16px;
  }
}
</style>
