<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="user-info-container">
        <UserInfo :user="user" @open-edit-dialog="openEditDialog" @logout="logout" />
      </v-col>
      <v-col cols="12" md="8">
        <MyFavorites
          :favorites="pagedFavorites"
          :total-pages="totalPages"
          :current-page="currentPage"
          @navigate-to-video="navigateToVideo"
          @update:current-page="handlePageChange"
        />
      </v-col>
    </v-row>

    <!-- 编辑用户信息对话框 -->
    <v-dialog v-model="editDialogVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">编辑用户信息</span>
        </v-card-title>
        <v-card-text>
          <el-form ref="editForm" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="form.confirmPassword"></el-input>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="requestEmailCode">保存</el-button>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 验证码对话框 -->
    <el-dialog title="请输入验证码" :visible.sync="verificationDialogVisible">
      <el-input v-model="emailCode" placeholder="输入邮箱验证码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="verificationDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveUserInfo">提交</el-button>
      </span>
    </el-dialog>
  </v-container>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'
import MyFavorites from '@/components/MyFavorites.vue'

export default {
  name: 'UserProfile',
  components: {
    UserInfo,
    MyFavorites
  },
  data() {
    return {
      editDialogVisible: false,
      verificationDialogVisible: false,
      emailCode: '',
      currentPage: 1,
      itemsPerPage: 8,
      form: {
        avatar: 'https://dn-qiniu-avatar.qbox.me/avatar/',
        username: '杨咩咩咩w',
        email: 'user@example.com',
        password: '',
        confirmPassword: ''
      },
      user: {
        avatar: 'https://dn-qiniu-avatar.qbox.me/avatar/',
        username: '杨咩咩咩w',
        email: 'user@example.com',
        level: 5,
        exp: 23510,
        maxExp: 28800
      },
      favorites: [
        {
          id: 1,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏1',
          updateTime: '2023-07-01'
        },
        {
          id: 2,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏2',
          updateTime: '2023-07-02'
        },
        {
          id: 3,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏3',
          updateTime: '2023-07-03'
        },
        {
          id: 4,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏4',
          updateTime: '2023-07-04'
        },
        {
          id: 5,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏5',
          updateTime: '2023-07-05'
        },
        {
          id: 6,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏6',
          updateTime: '2023-07-06'
        },
        {
          id: 7,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏7',
          updateTime: '2023-07-07'
        },
        {
          id: 8,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏8',
          updateTime: '2023-07-08'
        },
        {
          id: 9,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏9',
          updateTime: '2023-07-09'
        },
        {
          id: 10,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏10',
          updateTime: '2023-07-10'
        },
        {
          id: 11,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏11',
          updateTime: '2023-07-11'
        },
        {
          id: 12,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏12',
          updateTime: '2023-07-12'
        },
        {
          id: 13,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏13',
          updateTime: '2023-07-13'
        },
        {
          id: 14,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏14',
          updateTime: '2023-07-14'
        },
        {
          id: 15,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏15',
          updateTime: '2023-07-15'
        },
        {
          id: 16,
          thumbnail: 'https://placehold.co/400x700',
          title: '收藏16',
          updateTime: '2023-07-16'
        }
      ],
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.favorites.length / this.itemsPerPage)
    },
    pagedFavorites() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.favorites.slice(start, end)
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    requestEmailCode() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.verificationDialogVisible = true
        }
      })
    },
    openEditDialog() {
      this.form = { ...this.user }
      this.editDialogVisible = true
    },
    saveUserInfo() {
      if (this.emailCode) {
        this.user = { ...this.form }
        this.editDialogVisible = false
        this.verificationDialogVisible = false
        // 保存用户信息逻辑
      } else {
        console.log('请输入验证码')
      }
    },
    logout() {
      console.log('用户已退出登录')
    },
    navigateToVideo(videoId) {
      this.$router.push({ name: 'VideoPlayer', params: { id: videoId } })
    },
    handlePageChange(page) {
      this.currentPage = page
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  display: block;
  width: 178px;
  height: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100%;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.dialog-footer {
  text-align: right;
}

.user-info-container {
  margin-bottom: 0px;
}
</style>
