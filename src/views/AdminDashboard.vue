<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <div class="header-content">
        <h1>管理后台</h1>
        <div class="admin-info">
          <span>欢迎, {{ admin.username }}</span>
          <button @click="handleLogout" class="logout-btn">退出登录</button>
        </div>
      </div>
    </header>
    
    <div class="admin-content">
      <nav class="sidebar">
        <ul>
          <li>
            <router-link to="/admin/dashboard" active-class="active">
              <HomeIcon :size="18" />
              仪表盘
            </router-link>
          </li>
          <li>
            <router-link to="/admin/products" active-class="active">
              <PackageIcon :size="18" />
              产品管理
            </router-link>
          </li>
          <li>
            <router-link to="/admin/news" active-class="active">
              <FileTextIcon :size="18" />
              新闻管理
            </router-link>
          </li>
          <li>
            <router-link to="/admin/messages" active-class="active">
              <MailIcon :size="18" />
              消息管理
            </router-link>
          </li>
          <li>
            <a href="#" @click="showChangePasswordModal" class="change-password-link">
              <LockIcon :size="18" />
              修改密码
            </a>
          </li>
        </ul>
      </nav>
      
      <main class="main-content">
        <div class="dashboard-stats">
          <div class="stat-card">
            <h3>产品总数</h3>
            <p>{{ stats.products }}</p>
          </div>
          <div class="stat-card">
            <h3>新闻总数</h3>
            <p>{{ stats.news }}</p>
          </div>
          <div class="stat-card">
            <h3>消息总数</h3>
            <p>{{ stats.messages }}</p>
          </div>
        </div>
        
        <div class="recent-activity">
          <h2>最近活动</h2>
          <div class="activity-list">
            <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
              <div class="activity-icon">
                <UserIcon :size="16" />
              </div>
              <div class="activity-content">
                <p>{{ activity.description }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 修改密码模态框 -->
    <div v-if="showPasswordModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>修改密码</h2>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form @submit.prevent="handleChangePassword" class="password-form">
          <div class="form-group">
            <label for="currentPassword">当前密码</label>
            <input
              type="password"
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="newPassword">新密码</label>
            <input
              type="password"
              id="newPassword"
              v-model="passwordForm.newPassword"
              required
              minlength="6"
            />
            <small v-if="passwordForm.newPassword && passwordForm.newPassword.length < 6" class="error-text">
              密码长度至少为6位
            </small>
          </div>
          
          <div class="form-group">
            <label for="confirmNewPassword">确认新密码</label>
            <input
              type="password"
              id="confirmNewPassword"
              v-model="passwordForm.confirmNewPassword"
              required
            />
            <small v-if="passwordForm.newPassword && passwordForm.confirmNewPassword && 
                  passwordForm.newPassword !== passwordForm.confirmNewPassword" class="error-text">
              新密码和确认密码不一致
            </small>
          </div>
          
          <div v-if="passwordError" class="error-message">
            {{ passwordError }}
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-btn">取消</button>
            <button type="submit" class="submit-btn" :disabled="isPasswordFormInvalid">修改密码</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  HomeIcon, 
  PackageIcon, 
  FileTextIcon, 
  MailIcon,
  UserIcon,
  LockIcon
} from 'lucide-vue-next'
import API_BASE_URL from '@/api.js'

export default {
  name: 'AdminDashboard',
  components: {
    HomeIcon,
    PackageIcon,
    FileTextIcon,
    MailIcon,
    UserIcon,
    LockIcon
  },
  data() {
    return {
      admin: {
        username: 'admin'
      },
      stats: {
        products: 0,
        news: 0,
        messages: 0
      },
      recentActivities: [
        { id: 1, description: '新增产品 "智能AI助手"', time: '2小时前' },
        { id: 2, description: '发布新闻 "公司荣获创新奖"', time: '1天前' },
        { id: 3, description: '回复用户留言', time: '2天前' }
      ],
      showPasswordModal: false,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      passwordError: ''
    }
  },
  computed: {
    isPasswordFormInvalid() {
      return !this.passwordForm.currentPassword ||
             !this.passwordForm.newPassword ||
             !this.passwordForm.confirmNewPassword ||
             this.passwordForm.newPassword.length < 6 ||
             this.passwordForm.newPassword !== this.passwordForm.confirmNewPassword;
    }
  },
  async mounted() {
    if (!this.checkAuth()) {
      return
    }
    
    await this.fetchStats();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        this.$router.push('/admin/login')
        return false
      }
      return true
    },
    
    async fetchStats() {
      try {
        // 获取产品数量
        const productResponse = await fetch(`${API_BASE_URL}/api/products`)
        const productResult = await productResponse.json()
        if (productResponse.ok) {
          this.stats.products = productResult.data.length
        }
        
        // 获取新闻数量
        const newsResponse = await fetch(`${API_BASE_URL}/api/news`)
        const newsResult = await newsResponse.json()
        if (newsResponse.ok) {
          this.stats.news = newsResult.data.length
        }
        
        // 获取消息数量
        const messageResponse = await fetch(`${API_BASE_URL}/api/contact`)
        const messageResult = await messageResponse.json()
        if (messageResponse.ok) {
          this.stats.messages = messageResult.data.length
        }
      } catch (error) {
        console.error('获取统计数据时出错:', error)
      }
    },
    
    handleLogout() {
      localStorage.removeItem('adminToken');
      this.$router.push('/admin/login')
    },
    
    showChangePasswordModal() {
      this.showPasswordModal = true;
      this.passwordError = '';
      this.passwordForm = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
    },
    
    closeModal() {
      this.showPasswordModal = false;
      this.passwordError = '';
    },
    
    async handleChangePassword() {
      if (this.isPasswordFormInvalid) {
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify(this.passwordForm)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          this.closeModal();
          alert('密码修改成功');
        } else {
          this.passwordError = result.error || '密码修改失败';
        }
      } catch (error) {
        console.error('修改密码时出错:', error);
        this.passwordError = '服务器错误，请稍后再试';
      }
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
}

.admin-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
}

.header-content h1 {
  color: #333;
  font-size: 1.5rem;
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  padding: 8px 15px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background: #d32f2f;
}

.admin-content {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.sidebar {
  width: 250px;
  background: #f8f9fa;
  padding: 20px 0;
  border-right: 1px solid #eee;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 5px;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  text-decoration: none;
  color: #555;
  transition: all 0.3s;
}

.sidebar a:hover,
.sidebar a.active {
  background: #42b983;
  color: white;
}

.change-password-link {
  cursor: pointer;
}

.main-content {
  flex: 1;
  padding: 30px;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid #eee;
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 1rem;
}

.stat-card p {
  margin: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #42b983;
}

.recent-activity h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.activity-list {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.activity-item {
  display: flex;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  background: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-content p {
  margin: 0 0 5px 0;
  color: #333;
}

.activity-time {
  font-size: 0.85rem;
  color: #999;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.password-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
}

.error-text {
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}

.error-message {
  color: #f44336;
  background-color: #ffebee;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.cancel-btn {
  background: #f5f5f5;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.submit-btn {
  background: #42b983;
  color: white;
}

.submit-btn:hover {
  background: #359c6d;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
