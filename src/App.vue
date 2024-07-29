<template>
  <v-app :dark="isDarkMode">
    <Header
      @toggle-sidebar="toggleSidebar"
      @toggle-dark-mode="toggleDarkMode"
      :is-dark-mode="isDarkMode"
    />
    <v-navigation-drawer
      app
      v-model="sidebar"
      color="white"
      :permanent="permanentSidebar"
      @resize="onResize"
    >
      <Sidebar />
    </v-navigation-drawer>
    <v-container fluid>
      <v-row>
        <v-col>
          <MainContent />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
    <v-btn v-if="showBackToTop" icon large class="fixed-button top-button" @click="scrollToTop">
      <v-icon>
        <i class="fas fa-arrow-up"></i>
      </v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import MainContent from './components/MainContent.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Sidebar,
    MainContent,
    Footer
  },
  data() {
    return {
      sidebar: true,
      permanentSidebar: true,
      isDarkMode: false,
      showBackToTop: false
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    },
    onResize() {
      this.permanentSidebar = window.innerWidth > 800
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    handleScroll() {
      this.showBackToTop = window.scrollY > 200
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.fixed-button {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1000;
}
.top-button {
  bottom: 72px; /* Adjust to position above the other button */
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>

<style>
@font-face {
  font-family: 'HarmonyOS Sans';
  src:
    url('https://cdn.jsdelivr.net/gh/irozhi/HarmonyOS-Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Medium.woff2')
      format('woff2'),
    url('https://cdn.jsdelivr.net/gh/irozhi/HarmonyOS-Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Medium.woff')
      format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'HarmonyOS Sans', sans-serif;
}
</style>
