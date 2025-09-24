<template>
  <div class="admin-messages">
    <header class="admin-header">
      <div class="header-content">
        <h1>消息管理</h1>
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
        </ul>
      </nav>

      <main class="main-content">
        <div class="section-header">
          <h2>消息列表</h2>
        </div>
        
        <div class="messages-list">
          <div 
            v-for="message in messages" 
            :key="message.id" 
            class="message-item"
            :class="{ unread: !message.read }"
          >
            <div class="message-info">
              <div class="message-header">
                <h3>{{ message.name }}</h3>
                <span class="message-date">{{ formatDate(message.created_at) }}</span>
              </div>
              <p class="message-email">
                <MailIcon :size="14" />
                {{ message.email }}
              </p>
              <p v-if="message.phone" class="message-phone">
                <PhoneIcon :size="14" />
                {{ message.phone }}
              </p>
              <p class="message-content">{{ message.message }}</p>
            </div>
            <div class="message-actions">
              <button @click="deleteMessage(message.id)" class="delete-btn">
                <TrashIcon :size="16" />
                删除
              </button>
            </div>
          </div>
          
          <div v-if="messages.length === 0 && !loading" class="no-messages">
            <p>暂无消息</p>
          </div>
                
          <div v-if="error" class="error-message">
            <p>{{ error }}</p>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteConfirm">
      <div class="modal-content" @click.stop>
        <h2>确认删除</h2>
        <p>确定要删除这条消息吗？此操作不可撤销。</p>
        <div class="form-actions">
          <button type="button" @click="closeDeleteConfirm" class="cancel-btn">
            取消
          </button>
          <button type="button" @click="confirmDelete" class="delete-confirm-btn">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  MailIcon, 
  PhoneIcon, 
  TrashIcon, 
  CheckIcon,
  HomeIcon,
  PackageIcon,
  FileTextIcon
} from 'lucide-vue-next'
import API_BASE_URL from '@/api.js'

export default {
  name: 'AdminMessages',
  components: {
    MailIcon,
    PhoneIcon,
    TrashIcon,
    CheckIcon,
    HomeIcon,
    PackageIcon,
    FileTextIcon
  },
  data() {
    return {
      messages: [],
      loading: true,
      error: '',
      showDeleteConfirm: false,
      messageToDelete: null
    }
  },
  async mounted() {
    if (!this.checkAuth()) {
      return
    }
    
    await this.fetchMessages()
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
    async fetchMessages() {
      try {
        this.loading = true
        const response = await fetch(`${API_BASE_URL}/api/contact`)
        const result = await response.json()
        
        if (response.ok) {
          this.messages = result.data
        } else {
          this.error = result.error || '获取消息列表失败'
        }
      } catch (error) {
        this.error = '网络错误，请稍后重试'
        console.error('获取消息列表时出错:', error)
      } finally {
        this.loading = false
      }
    },
    
    async deleteMessage(id) {
      if (!confirm('确定要删除这条消息吗？')) {
        return
      }
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/contact/${id}`, {
          method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (response.ok) {
          await this.fetchMessages()
        } else {
          alert(result.error || '删除消息失败')
        }
      } catch (error) {
        alert('网络错误，请稍后重试')
        console.error('删除消息时出错:', error)
      }
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    handleLogout() {
      this.$router.push('/admin/login')
    }
  }
}
</script>

<style scoped>
.admin-messages {
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
  margin: 0;
  color: #333;
  font-size: 1.5rem;
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

.main-content {
  flex: 1;
  padding: 30px;
}

.section-header h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.message-item.unread {
  border-left: 4px solid #42b983;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.message-header h3 {
  margin: 0;
  color: #333;
}

.message-date {
  font-size: 0.9rem;
  color: #999;
}

.message-email,
.message-phone {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  color: #666;
  font-size: 0.9rem;
}

.message-content {
  margin: 15px 0 0 0;
  color: #333;
  line-height: 1.5;
}

.message-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.read-btn,
.delete-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.read-btn {
  background: #42b983;
  color: white;
}

.read-btn:hover {
  background: #359c6d;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #d32f2f;
}

.no-messages {
  text-align: center;
  padding: 40px;
  color: #999;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.delete-confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.cancel-btn {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background: #e9ecef;
}

.delete-confirm-btn {
  background: #f44336;
  color: white;
}

.delete-confirm-btn:hover {
  background: #d32f2f;
}
</style>