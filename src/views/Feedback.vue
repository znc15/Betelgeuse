<template>
  <el-container class="feedback-container">
    <el-main class="feedback-main">
      <el-card class="feedback-card">
        <h2>反馈问题</h2>
        <el-form
          :model="feedbackForm"
          :rules="rules"
          ref="feedbackForm"
          label-width="100px"
          label-position="top"
        >
          <el-form-item label="影片名字" prop="filmName">
            <el-input v-model="feedbackForm.filmName"></el-input>
          </el-form-item>
          <el-form-item label="网站内地址" prop="siteUrl">
            <el-input v-model="feedbackForm.siteUrl"></el-input>
          </el-form-item>
          <el-form-item label="问题描述" prop="issueDescription">
            <el-input type="textarea" v-model="feedbackForm.issueDescription"></el-input>
          </el-form-item>
          <el-form-item label="收件邮箱" prop="email">
            <el-input v-model="feedbackForm.email"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="verificationCode" class="verification-code-item">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input v-model="feedbackForm.verificationCode"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button @click="sendVerificationCode" class="send-code-button"
                  >发送验证码</el-button
                >
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="form-buttons">
            <el-button type="primary" @click="submitFeedback" class="submit-button"
              >提交反馈</el-button
            >
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      feedbackForm: {
        filmName: '',
        siteUrl: '',
        issueDescription: '',
        email: '',
        verificationCode: ''
      },
      rules: {
        filmName: [{ required: true, message: '请输入影片名字', trigger: 'blur' }],
        siteUrl: [{ required: true, message: '请输入网站内地址', trigger: 'blur' }],
        issueDescription: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入收件邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
        ],
        verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitFeedback() {
      this.$refs.feedbackForm.validate((valid) => {
        if (valid) {
          // 提交反馈逻辑
          console.log('反馈信息已提交:', this.feedbackForm)
          this.resetForm()
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.feedbackForm.resetFields()
    },
    sendVerificationCode() {
      // 发送验证码逻辑
      console.log('验证码已发送到:', this.feedbackForm.email)
    }
  }
}
</script>

<style scoped>
.feedback-container {
  margin: 20px;
}

.feedback-main {
  padding: 0;
}

.feedback-card {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.submit-button {
  background-color: #409eff;
  color: white;
}

.verification-code-item .el-row {
  align-items: center;
}
</style>
