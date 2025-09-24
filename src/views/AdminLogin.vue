<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-form">
        <h1>管理员登录</h1>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">用户名</label>
            <input 
              type="text" 
              id="username" 
              v-model="form.username" 
              placeholder="请输入用户名"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="password">密码</label>
            <input 
              type="password" 
              id="password" 
              v-model="form.password" 
              placeholder="请输入密码"
              required
            />
          </div>
          
          <button type="submit" class="login-btn" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import API_BASE_URL from '@/api.js';

export default {
  name: 'AdminLogin',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = ''
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })
        
        const result = await response.json()
        
        if (response.ok) {
          // 登录成功，跳转到管理主页
          this.$router.push('/admin/dashboard')
        } else {
          this.error = result.error || '登录失败'
        }
      } catch (error) {
        this.error = '网络错误，请稍后重试'
        console.error('登录时出错:', error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 120px);
  padding: 20px;
  background-color: #f5f7fa;
}

.login-container {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.login-form {
  padding: 40px;
}

.login-form h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2d3748;
  font-size: 1.8rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;
  box-sizing: border-box;
  background-color: #f8fafc;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.login-btn:hover:not(:disabled) {
  background: #359c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.login-btn:disabled {
  background: #a0d8c5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  margin-top: 20px;
  padding: 12px;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  border: 1px solid #fecaca;
}

@media (max-width: 480px) {
  .login-form {
    padding: 30px 20px;
  }
  
  .login-form h1 {
    font-size: 1.5rem;
  }
}
</style>