<template>
  <v-card class="equal-height-card">
    <v-card-title>我的收藏</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="(item, index) in favorites"
          :key="index"
          @click="$emit('navigate-to-video', item.id)"
          class="hover-shadow"
        >
          <v-card class="transparent no-shadow">
            <v-img :src="item.thumbnail" aspect-ratio="9/16" class="rounded-img"></v-img>
            <v-card-title class="small-text">{{ item.title }}</v-card-title>
            <v-card-subtitle class="small-text">{{ item.updateTime }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <el-row justify="center" class="mt-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalPages * itemsPerPage"
          :page-size="itemsPerPage"
          @current-change="handlePageChange"
        ></el-pagination>
      </el-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MyFavorites',
  props: {
    favorites: {
      type: Array,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 8
    }
  },
  methods: {
    handlePageChange(page) {
      this.$emit('update:current-page', page)
    }
  }
}
</script>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.no-shadow {
  box-shadow: none;
}

.small-text {
  font-size: 12px;
}

.rounded-img {
  border-radius: 6px;
}

.equal-height-card {
  min-height: 300px; /* or any desired value */
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>
