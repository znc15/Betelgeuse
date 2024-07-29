<template>
  <div>
    <v-container class="banner-container">
      <v-img
        :src="currentImage"
        class="rounded-img top-banner"
        :lazy-src="lazyImage"
        height="450px"
        cover
      ></v-img>
    </v-container>
    <v-container class="mt-4 video-container">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="video in videos" :key="video.id">
          <v-card class="transparent no-shadow" @click="goToVideoPlayer(video.id)">
            <v-img
              :src="video.thumbnail"
              :lazy-src="lazyImage"
              class="rounded-img"
              height="400px"
              cover
            ></v-img>
            <v-card-title class="small-text left-align">{{ video.title }}</v-card-title>
            <v-card-subtitle class="small-text left-align">{{ video.updateTime }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesDesktop: [
        'https://api.littlesheep.cc/api/image/webp/?1',
        'https://api.littlesheep.cc/api/image/webp/?2',
        'https://api.littlesheep.cc/api/image/webp/?3'
      ],
      imagesMobile: [
        'https://api.littlesheep.cc/api/image/webp/?1',
        'https://api.littlesheep.cc/api/image/webp/?2',
        'https://api.littlesheep.cc/api/image/webp/?3'
      ],
      currentIndex: 0,
      isMobile: false,
      lazyImage: 'https://i1.mcobj.com/uploads/20231027_653b1e67109b6.gif',
      videos: [
        {
          id: 1,
          thumbnail: 'https://placehold.co/150x300',
          title: '视频1',
          updateTime: '2023-07-01'
        },
        {
          id: 2,
          thumbnail: 'https://placehold.co/100x300',
          title: '视频2',
          updateTime: '2023-07-02'
        },
        {
          id: 3,
          thumbnail: 'https://placehold.co/100x300',
          title: '视频3',
          updateTime: '2023-07-03'
        },
        {
          id: 4,
          thumbnail: 'https://placehold.co/100x300',
          title: '视频4',
          updateTime: '2023-07-04'
        },
        {
          id: 5,
          thumbnail: 'https://placehold.co/100x300',
          title: '视频5',
          updateTime: '2023-07-05'
        },
        {
          id: 6,
          thumbnail: 'https://placehold.co/100x300',
          title: '视频6',
          updateTime: '2023-07-06'
        },
        {
          id: 7,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频7',
          updateTime: '2023-07-07'
        },
        {
          id: 8,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频8',
          updateTime: '2023-07-08'
        },
        {
          id: 9,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频9',
          updateTime: '2023-07-01'
        },
        {
          id: 10,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频10',
          updateTime: '2023-07-01'
        },
        {
          id: 11,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频11',
          updateTime: '2023-07-01'
        },
        {
          id: 12,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频12',
          updateTime: '2023-07-01'
        },
        {
          id: 13,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频13',
          updateTime: '2023-07-01'
        },
        {
          id: 14,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频14',
          updateTime: '2023-07-01'
        },
        {
          id: 15,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频15',
          updateTime: '2023-07-01'
        },
        {
          id: 16,
          thumbnail: 'https://placehold.co/200x300',
          title: '视频16',
          updateTime: '2023-07-01'
        }
      ]
    }
  },
  computed: {
    currentImage() {
      return this.isMobile
        ? this.imagesMobile[this.currentIndex]
        : this.imagesDesktop[this.currentIndex]
    }
  },
  methods: {
    nextImage() {
      this.currentIndex =
        (this.currentIndex + 1) %
        (this.isMobile ? this.imagesMobile.length : this.imagesDesktop.length)
    },
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 600
    },
    goToVideoPlayer(videoId) {
      this.$router.push({ name: 'VideoPlayer', params: { id: videoId } })
    }
  },
  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
    this.imageInterval = setInterval(this.nextImage, 30000) // 每30秒切换一次图片
  },
  beforeDestroy() {
    clearInterval(this.imageInterval)
    window.removeEventListener('resize', this.checkIsMobile)
  }
}
</script>

<style scoped>
.banner-container {
  padding: 0;
}

.top-banner {
  width: 100%;
  height: 300px; /* Fixed height for both desktop and mobile */
}

.top-banner .v-image__image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.video-container {
  padding: 0;
}

.transparent {
  background: transparent;
}

.no-shadow {
  box-shadow: none;
}

.rounded-img {
  border-radius: 8px;
}

.small-text {
  font-size: 12px;
}

.left-align {
  text-align: left;
  font-size: 15px;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
