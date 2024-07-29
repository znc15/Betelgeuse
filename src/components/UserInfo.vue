<template>
  <v-card class="equal-height-card buttom-editor">
    <v-card-title>用户信息</v-card-title>
    <v-card-text>
      <div class="text-center">
        <v-avatar size="auto" class="mx-auto my-4">
          <img :src="user.avatar" alt="avatar" />
        </v-avatar>
        <h3>{{ user.username }}</h3>
        <v-chip color="pink" text-color="white" class="rect-chip ma-2">年度大会员</v-chip>
        <div class="level-info mt-2">
          <span>等级 {{ user.level }}</span>
          <span class="exp-text ml-4">{{ user.exp }} / {{ user.maxExp }}</span>
        </div>
        <div class="exp-bar-container">
          <el-progress
            :show-text="false"
            :percentage="(user.exp / user.maxExp) * 100"
            stroke-width="9"
            class="exp-bar"
          ></el-progress>
        </div>
      </div>
      <v-row class="mt-6" justify="center">
        <v-btn @click="$emit('open-edit-dialog')" class="mx-2">编辑用户信息</v-btn>
        <v-btn color="red" @click="$emit('logout')" class="mx-2">退出登录</v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/userProfile.css';

.exp-bar-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.buttom-editor {
  margin-bottom: 15px;
}
</style>
