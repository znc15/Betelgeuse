<template>
  <v-list>
    <v-list-item
      @click="navigateTo('Home')"
      prepend-icon="fas fa-home"
      title="首页"
      class="weight-box"
    ></v-list-item>
    <v-list-item
      @click="navigateTo('Feedback')"
      prepend-icon="fa-solid fa-question"
      title="反馈"
      class="weight-box"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item @click="navigateToCategory(1)" link title="电影" class="weight-box"></v-list-item>
    <v-list-item
      @click="navigateToCategory(2)"
      link
      title="电视剧"
      class="weight-box"
    ></v-list-item>
    <v-list-item link title="纪录片" class="weight-box"></v-list-item>
    <v-list-item link title="番剧" class="weight-box"></v-list-item>
    <v-list-item link title="短剧" class="weight-box"></v-list-item>
  </v-list>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter()

    function navigateTo(routeName) {
      router.push({ name: routeName })
    }

    function navigateToCategory(categoryId) {
      router.push({ name: 'Categories', params: { id: categoryId } })
    }

    return {
      navigateTo,
      navigateToCategory
    }
  }
}
</script>

<style scoped>
.v-navigation-drawer {
  box-shadow: none;
}
.weight-box {
  margin: 10px;
}
</style>
