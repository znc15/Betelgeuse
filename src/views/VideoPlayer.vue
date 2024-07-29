<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <div class="video-player">
          <iframe
            :src="currentVideoUrl"
            frameborder="0"
            width="100%"
            height="500px"
            allowfullscreen
            class="rounded-iframe"
          ></iframe>
        </div>
        <div class="actions mt-4">
          <v-btn icon class="action-btn">
            <i class="fas fa-thumbs-up"></i>
          </v-btn>
          <v-btn icon class="action-btn">
            <i class="fas fa-bookmark"></i>
          </v-btn>
          <v-btn icon class="action-btn">
            <i class="fas fa-share"></i>
          </v-btn>
        </div>
        <v-card class="mt-4 video-info">
          <v-row>
            <v-col cols="4">
              <v-img
                src="https://placehold.co/350x150"
                aspect-ratio="1"
                class="rounded-img"
                cover
              ></v-img>
            </v-col>
            <v-col cols="8">
              <h2>国家宝藏 第4季</h2>
              <p class="video-stats">2067.7万播放 · 6.4万弹幕 · 119万系列追剧</p>
              <p class="video-meta">文化 / 真人秀 · 2024 · 连载中 · BV1MnvLeME7V</p>
              <p>
                简介：2024年，《国家宝藏》第四季等你重磅回归，由故宫博物院领衔，携手八大省级博物馆，持续展示中华民族文明瑰宝，邀您踏步恒久且血脉中的国家记忆。在中华文明多元一体，连续不断，蕴含青春的浩瀚洪流中，选择文明的馈赠，锚定文明的未来。
              </p>
            </v-col>
          </v-row>
        </v-card>
        <div v-if="isMobile">
          <v-select
            v-model="selectedSource"
            :items="videoSources"
            label="选择播放源"
            class="mb-4"
          ></v-select>
          <v-list class="episode-list mb-4">
            <v-subheader>选集</v-subheader>
            <v-row class="episode-container" no-gutters>
              <v-col cols="auto" v-for="episode in episodes" :key="episode.id" class="episode-col">
                <v-btn class="episode-btn" @click="playEpisode(episode)">
                  {{ episode.title }}
                </v-btn>
              </v-col>
            </v-row>
          </v-list>
        </div>
        <post-comment @post-comment="addComment"></post-comment>
        <comment-list :comments="comments" @reply="replyToComment"></comment-list>
      </v-col>
      <v-col cols="12" md="4" v-if="!isMobile">
        <v-select
          v-model="selectedSource"
          :items="videoSources"
          label="选择播放源"
          class="mb-4"
        ></v-select>
        <v-list class="episode-list mb-4">
          <v-subheader>选集</v-subheader>
          <v-row class="episode-container" no-gutters>
            <v-col cols="auto" v-for="episode in episodes" :key="episode.id" class="episode-col">
              <v-btn class="episode-btn" @click="playEpisode(episode)">
                {{ episode.title }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list>
        <v-subheader class="mt-4 recommendation-title">推荐</v-subheader>
        <v-row class="recommendation-container">
          <v-col cols="12" v-for="recommendation in recommendations" :key="recommendation.id">
            <v-card class="transparent no-shadow" @click="goToVideoPlayer(recommendation.id)">
              <v-img
                :src="recommendation.thumbnail"
                class="rounded-img"
                height="150px"
                cover
              ></v-img>
              <v-card-title class="small-text left-align">{{ recommendation.title }}</v-card-title>
              <v-card-subtitle class="small-text left-align"
                >更新日期 {{ recommendation.updateTime }}</v-card-subtitle
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PostComment from '@/components/PostComment.vue'
import CommentList from '@/components/CommentList.vue'
import '@/assets/css/videoPlayer.css'

export default {
  components: {
    PostComment,
    CommentList
  },
  data() {
    return {
      isMobile: false,
      currentVideoUrl: '',
      videoDescription: '',
      comments: [
        {
          id: 1,
          author: '用户1',
          text: '这是一条评论',
          date: '2024-07-27 19:44',
          likes: 2,
          replies: [
            { id: 1, author: '用户1-1', text: '这是一条回复', date: '2024-07-27 20:20', likes: 1 },
            { id: 2, author: '用户1-2', text: '这是另一条回复', date: '2024-07-27 21:00', likes: 0 }
          ]
        },
        {
          id: 2,
          author: '用户2',
          text: '这是另一条评论',
          date: '2024-07-27 19:50',
          likes: 3,
          replies: [
            { id: 3, author: '用户2-1', text: '这是另一条回复', date: '2024-07-27 20:30', likes: 0 }
          ]
        }
      ],
      videoSources: ['Bilibili', '腾讯视频'],
      selectedSource: 'Bilibili',
      episodes: [
        { id: 1, title: '第1集', src: 'https://s10.fsvod1.com/20240725/Jy8VLeSu/index.m3u8' },
        { id: 2, title: '第2集', src: 'https://s10.fsvod1.com/20240725/HYRBP4sS/index.m3u8' },
        { id: 3, title: '第3集', src: 'https://s10.fsvod1.com/20240725/V8LqCwBv/index.m3u8' }
      ],
      episodesTencent: [
        { id: 1, title: '第1集', src: 'https://vod12.wgslsw.com/20240708/D6ij8UaT8q84/index.m3u8' },
        { id: 2, title: '第2集', src: 'https://vod12.wgslsw.com/20240714/veAh8NC5x083/index.m3u8' },
        { id: 3, title: '第3集', src: 'https://vod12.wgslsw.com/20240722/ZzNquLbKDU84/index.m3u8' }
      ],
      recommendations: [
        {
          id: 1,
          title: '推荐视频1',
          thumbnail: 'https://placehold.co/400x150',
          updateTime: '2023-07-01'
        },
        {
          id: 2,
          title: '推荐视频2',
          thumbnail: 'https://placehold.co/400x150',
          updateTime: '2023-07-02'
        }
      ],
      replyTo: null
    }
  },
  methods: {
    playEpisode(episode) {
      let playerBaseUrl
      if (this.selectedSource === 'Bilibili') {
        playerBaseUrl = 'https://www.feisuplayer.com/m3u8/?url='
      } else if (this.selectedSource === '腾讯视频') {
        playerBaseUrl = 'https://jx.yhzybf.com/player/jx.php?url='
      }
      this.currentVideoUrl = `${playerBaseUrl}${episode.src}`
    },
    goToVideoPlayer(videoId) {
      this.$router.push({ name: 'VideoPlayer', params: { id: videoId } })
    },
    addComment(comment) {
      this.comments.push({
        id: this.comments.length + 1,
        author: '当前用户',
        text: comment,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      })
    },
    replyToComment(comment) {
      this.replyTo = comment
    },
    handleClickOutside(event) {
      if (
        !event.target.closest('.reply-comment') &&
        !event.target.closest('.comment-actions span')
      ) {
        this.replyTo = null
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 600
    }
  },
  watch: {
    replyTo(newVal) {
      if (newVal) {
        document.addEventListener('click', this.handleClickOutside)
      } else {
        document.removeEventListener('click', this.handleClickOutside)
      }
    },
    selectedSource() {
      // 自动播放第一个视频
      const episodes = this.selectedSource === 'Bilibili' ? this.episodes : this.episodesTencent
      this.playEpisode(episodes[0])
    }
  },
  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
    this.selectedSource = 'Bilibili'
    this.playEpisode(this.episodes[0])
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIsMobile)
  }
}
</script>
