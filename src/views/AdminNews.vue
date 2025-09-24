<template>
  <div class="admin-news">
    <header class="admin-header">
      <div class="header-content">
        <h1>新闻管理</h1>
        <button @click="showCreateForm" class="add-btn">
          <PlusIcon :size="18" />
          添加新闻
        </button>
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
          <h2>新闻列表</h2>
        </div>
        
        <div class="news-list">
          <div 
            v-for="news in newsList" 
            :key="news.id" 
            class="news-item"
          >
            <div class="news-info">
              <h3>{{ news.title }}</h3>
              <p class="news-meta">
                <span class="news-author">
                  <UserIcon :size="14" />
                  {{ news.author }}
                </span>
                <span class="news-date">
                  <CalendarIcon :size="14" />
                  {{ formatDate(news.created_at) }}
                </span>
              </p>
              <p class="news-excerpt">{{ getExcerpt(news.content, 100) }}</p>
            </div>
            <div class="news-actions">
              <button @click="editNews(news)" class="edit-btn">
                <EditIcon :size="16" />
                编辑
              </button>
              <button @click="deleteNews(news.id)" class="delete-btn">
                <TrashIcon :size="16" />
                删除
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 添加/编辑新闻模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ editingNews ? '编辑新闻' : '添加新闻' }}</h2>
        <form @submit.prevent="saveNews">
          <div class="form-group">
            <label for="title">新闻标题</label>
            <input 
              type="text" 
              id="title" 
              v-model="newsForm.title" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="author">作者</label>
            <input 
              type="text" 
              id="author" 
              v-model="newsForm.author" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="content">新闻内容</label>
            <textarea 
              id="content" 
              v-model="newsForm.content" 
              rows="6"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="image_url">图片链接</label>
            <input 
              type="text" 
              id="image_url" 
              v-model="newsForm.image_url"
            />
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              取消
            </button>
            <button type="submit" class="save-btn">
              {{ editingNews ? '更新' : '添加' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteConfirm">
      <div class="modal-content" @click.stop>
        <h2>确认删除</h2>
        <p>确定要删除新闻 "{{ newsToDelete?.title }}" 吗？此操作不可撤销。</p>
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
  PlusIcon, 
  EditIcon, 
  TrashIcon, 
  UserIcon, 
  CalendarIcon,
  HomeIcon,
  PackageIcon,
  FileTextIcon,
  MailIcon
} from 'lucide-vue-next'
import API_BASE_URL from '@/api.js'

export default {
  name: 'AdminNews',
  components: {
    PlusIcon,
    EditIcon,
    TrashIcon,
    UserIcon,
    CalendarIcon,
    HomeIcon,
    PackageIcon,
    FileTextIcon,
    MailIcon
  },
  data() {
    return {
      newsList: [],
      showModal: false,
      showDeleteConfirm: false,
      editingNews: null,
      newsToDelete: null,
      newsForm: {
        title: '',
        author: '',
        content: '',
        image_url: ''
      }
    }
  },
  async mounted() {
    if (!this.checkAuth()) {
      return
    }
    
    await this.fetchNews()
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
    
    async fetchNews() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/news`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })
        const result = await response.json()
        
        if (response.ok) {
          this.newsList = result.data
        } else {
          console.error('获取新闻失败:', result.error)
        }
      } catch (error) {
        console.error('获取新闻时出错:', error)
      }
    },
    
    showCreateForm() {
      this.editingNews = null
      this.newsForm = {
        title: '',
        author: '',
        content: '',
        image_url: ''
      }
      this.showModal = true
    },
    
    editNews(news) {
      this.editingNews = news
      this.newsForm = { ...news }
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
      this.editingNews = null
    },
    
    async saveNews() {
      try {
        const url = this.editingNews 
          ? `${API_BASE_URL}/api/news/${this.editingNews.id}` 
          : `${API_BASE_URL}/api/news`
          
        const method = this.editingNews ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          },
          body: JSON.stringify(this.newsForm)
        })
        
        const result = await response.json()
        
        if (response.ok) {
          this.closeModal()
          await this.fetchNews()
        } else {
          alert(result.error || '操作失败')
        }
      } catch (error) {
        console.error('保存新闻时出错:', error)
        alert('网络错误，请稍后重试')
      }
    },
    
    deleteNews(id) {
      const news = this.newsList.find(n => n.id === id)
      this.newsToDelete = news
      this.showDeleteConfirm = true
    },
    
    closeDeleteConfirm() {
      this.showDeleteConfirm = false
      this.newsToDelete = null
    },
    
    async confirmDelete() {
      if (!this.newsToDelete) return
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/news/${this.newsToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
          }
        })
        
        const result = await response.json()
        
        if (response.ok) {
          this.closeDeleteConfirm()
          await this.fetchNews()
        } else {
          alert(result.error || '删除失败')
        }
      } catch (error) {

      }
    },
    
    getExcerpt(content, length) {
      if (!content) return ''
      return content.length > length ? content.substring(0, length) + '...' : content
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.admin-news {
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

.add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background: #359c6d;
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

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.news-info {
  flex: 1;
}

.news-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #666;
}

.news-author,
.news-date {
  display: flex;
  align-items: center;
  gap: 5px;
}

.news-excerpt {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.news-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-btn,
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

.edit-btn {
  background: #ffc107;
  color: #212529;
}

.edit-btn:hover {
  background: #e0a800;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #d32f2f;
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
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn,
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

.save-btn,
.delete-confirm-btn {
  background: #42b983;
  color: white;
}

.save-btn:hover,
.delete-confirm-btn:hover {
  background: #359c6d;
}

.delete-confirm-btn {
  background: #f44336;
}

.delete-confirm-btn:hover {
  background: #d32f2f;
}

@media (max-width: 768px) {
  .news-item {
    flex-direction: column;
  }
  
  .news-actions {
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>