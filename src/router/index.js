import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Feedback from '@/views/Feedback.vue'
import VideoPlayer from '@/views/VideoPlayer.vue'
import UserProfile from '@/views/UserProfile.vue'
import Messages from '@/views/Messages.vue'
import CommentDetail from '@/views/CommentDetail.vue'
import History from '@/views/History.vue'
import Categories from '@/views/Categories.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback
  },
  {
    path: '/video/:id',
    name: 'VideoPlayer',
    component: VideoPlayer
  },
  {
    path: '/user-profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/comment/:id',
    name: 'CommentDetail',
    component: CommentDetail
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/categories/:id',
    name: 'Categories',
    component: Categories
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
