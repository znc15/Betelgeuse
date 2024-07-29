<template>
  <div class="categories-container">
    <div class="filter-header rounded-border">
      <div class="filter-group">
        <span class="filter-title">最热</span>
        <el-button @click="setFilter('sort', '最热')" type="text">最热</el-button>
        <el-button @click="setFilter('sort', '最新')" type="text">最新</el-button>
        <el-button @click="setFilter('sort', '高分好评')" type="text">高分好评</el-button>
      </div>
      <div class="filter-group">
        <span class="filter-title">类型</span>
        <el-button @click="setFilter('type', '动作')" type="text">动作</el-button>
        <el-button @click="setFilter('type', '喜剧')" type="text">喜剧</el-button>
        <el-button @click="setFilter('type', '爱情')" type="text">爱情</el-button>
        <el-button @click="setFilter('type', '科幻')" type="text">科幻</el-button>
        <el-button @click="setFilter('type', '犯罪')" type="text">犯罪</el-button>
        <el-button @click="setFilter('type', '冒险')" type="text">冒险</el-button>
        <el-button @click="setFilter('type', '恐怖')" type="text">恐怖</el-button>
        <el-button @click="setFilter('type', '动画')" type="text">动画</el-button>
        <el-button @click="setFilter('type', '战争')" type="text">战争</el-button>
        <el-button @click="setFilter('type', '悬疑')" type="text">悬疑</el-button>
        <el-button @click="setFilter('type', '灾难')" type="text">灾难</el-button>
        <el-button @click="setFilter('type', '青春')" type="text">青春</el-button>
      </div>
      <div class="filter-group">
        <span class="filter-title">地区</span>
        <el-button @click="setFilter('region', '内地')" type="text">内地</el-button>
        <el-button @click="setFilter('region', '中国香港')" type="text">中国香港</el-button>
        <el-button @click="setFilter('region', '中国台湾')" type="text">中国台湾</el-button>
        <el-button @click="setFilter('region', '美国')" type="text">美国</el-button>
        <el-button @click="setFilter('region', '日本')" type="text">日本</el-button>
        <el-button @click="setFilter('region', '韩国')" type="text">韩国</el-button>
        <el-button @click="setFilter('region', '泰国')" type="text">泰国</el-button>
        <el-button @click="setFilter('region', '印度')" type="text">印度</el-button>
        <el-button @click="setFilter('region', '英国')" type="text">英国</el-button>
        <el-button @click="setFilter('region', '法国')" type="text">法国</el-button>
        <el-button @click="setFilter('region', '德国')" type="text">德国</el-button>
        <el-button @click="setFilter('region', '加拿大')" type="text">加拿大</el-button>
        <el-button @click="setFilter('region', '西班牙')" type="text">西班牙</el-button>
        <el-button @click="setFilter('region', '意大利')" type="text">意大利</el-button>
        <el-button @click="setFilter('region', '澳大利亚')" type="text">澳大利亚</el-button>
        <el-button @click="setFilter('region', '其它')" type="text">其它</el-button>
      </div>
      <div class="filter-group">
        <span class="filter-title">年份</span>
        <el-button @click="setFilter('year', '2024')" type="text">2024</el-button>
        <el-button @click="setFilter('year', '2023')" type="text">2023</el-button>
        <el-button @click="setFilter('year', '2022')" type="text">2022</el-button>
        <el-button @click="setFilter('year', '2021')" type="text">2021</el-button>
        <el-button @click="setFilter('year', '2020')" type="text">2020</el-button>
        <el-button @click="setFilter('year', '2019')" type="text">2019</el-button>
        <el-button @click="setFilter('year', '2018')" type="text">2018</el-button>
        <el-button @click="setFilter('year', '2017')" type="text">2017</el-button>
        <el-button @click="setFilter('year', '2016')" type="text">2016</el-button>
        <el-button @click="setFilter('year', '2015')" type="text">2015</el-button>
        <el-button @click="setFilter('year', '2014')" type="text">2014</el-button>
        <el-button @click="setFilter('year', '2013-2011')" type="text">2013-2011</el-button>
        <el-button @click="setFilter('year', '2010-2006')" type="text">2010-2006</el-button>
        <el-button @click="setFilter('year', '2005-2000')" type="text">2005-2000</el-button>
        <el-button @click="setFilter('year', '90年代')" type="text">90年代</el-button>
        <el-button @click="setFilter('year', '80年代')" type="text">80年代</el-button>
        <el-button @click="setFilter('year', '其他')" type="text">其他</el-button>
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in filteredItems" :key="item.id" class="item-card">
        <div class="item-container">
          <img :src="item.thumbnail" class="rounded-img" />
          <div class="item-info">
            <div>{{ item.title }}</div>
            <div class="small-text">更新时间: {{ item.updateTime }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        sort: '',
        type: '',
        region: '',
        year: ''
      },
      items: {
        movie: [
          {
            id: 1,
            title: '电影1',
            year: '2024',
            region: '内地',
            language: '国语',
            type: '动作',
            cost: '免费',
            updateTime: '2024-01-01',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 2,
            title: '电影2',
            year: '2023',
            region: '美国',
            language: '英语',
            type: '喜剧',
            cost: '会员',
            updateTime: '2024-01-02',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 3,
            title: '电影3',
            year: '2022',
            region: '日本',
            language: '日语',
            type: '科幻',
            cost: '付费',
            updateTime: '2024-01-03',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 4,
            title: '电影4',
            year: '2021',
            region: '韩国',
            language: '韩语',
            type: '犯罪',
            cost: '免费',
            updateTime: '2024-01-04',
            thumbnail: 'https://placehold.co/200x300'
          }
        ],
        tv: [
          {
            id: 1,
            title: '电视剧1',
            year: '2024',
            region: '内地',
            language: '国语',
            type: '动作',
            cost: '免费',
            updateTime: '2024-01-05',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 2,
            title: '电视剧2',
            year: '2023',
            region: '美国',
            language: '英语',
            type: '喜剧',
            cost: '会员',
            updateTime: '2024-01-06',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 3,
            title: '电视剧3',
            year: '2022',
            region: '日本',
            language: '日语',
            type: '科幻',
            cost: '付费',
            updateTime: '2024-01-07',
            thumbnail: 'https://placehold.co/200x300'
          },
          {
            id: 4,
            title: '电视剧4',
            year: '2018',
            region: '日本',
            language: '日语',
            type: '科幻',
            cost: '会员',
            updateTime: '2024-01-08',
            thumbnail: 'https://placehold.co/200x300'
          }
        ]
      }
    }
  },
  computed: {
    filteredItems() {
      let selectedItems = this.items[this.$route.params.id === '1' ? 'movie' : 'tv']
      if (this.filters.type) {
        selectedItems = selectedItems.filter((item) => item.type === this.filters.type)
      }
      if (this.filters.region) {
        selectedItems = selectedItems.filter((item) => item.region === this.filters.region)
      }
      if (this.filters.year) {
        selectedItems = selectedItems.filter((item) => item.year === this.filters.year)
      }
      return selectedItems
    }
  },
  methods: {
    setFilter(key, value) {
      this.filters[key] = value
    }
  }
}
</script>

<style scoped>
.categories-container {
  margin-top: 20px;
}

.filter-header {
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.filter-title {
  font-weight: bold;
  margin-right: 10px;
}

.item-card {
  margin-bottom: 20px;
}

.item-info {
  padding: 10px;
}

.small-text {
  font-size: 12px;
  color: #999;
}

.rounded-img {
  border-radius: 8px;
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
