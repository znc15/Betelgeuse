<template>
  <div class="floating-buttons">
    <v-btn icon @click="toggleDarkMode">
      <v-icon>
        <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
      </v-icon>
    </v-btn>
    <v-btn icon v-show="showScrollTop" @click="scrollToTop">
      <v-icon>
        <i class="fas fa-arrow-up"></i>
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      darkMode: false,
      showScrollTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.darkMode = this.$vuetify.theme.dark
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      this.$vuetify.theme.dark = this.darkMode
    },
    handleScroll() {
      this.showScrollTop = window.scrollY > 100
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
.floating-buttons {
  position: fixed;
  bottom: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
