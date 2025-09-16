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
  </div>
</template>

<script>
import { 
  HomeIcon, 
  PackageIcon, 
  FileTextIcon, 
  MailIcon,
  UserIcon
} from 'lucide-vue-next'

export default {
  name: 'AdminDashboard',
  components: {
    HomeIcon,
    PackageIcon,
    FileTextIcon,
    MailIcon,
    UserIcon
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
      ]
    }
  },
  async mounted() {
    // 获取统计数据
    await this.fetchStats()
  },
  methods: {
    async fetchStats() {
      try {
        // 获取产品数量
        const productResponse = await fetch('/api/products')
        const productResult = await productResponse.json()
        if (productResponse.ok) {
          this.stats.products = productResult.data.length
        }
        
        // 获取新闻数量
        const newsResponse = await fetch('/api/news')
        const newsResult = await newsResponse.json()
        if (newsResponse.ok) {
          this.stats.news = newsResult.data.length
        }
        
        // 获取消息数量
        const messageResponse = await fetch('/api/contact')
        const messageResult = await messageResponse.json()
        if (messageResponse.ok) {
          this.stats.messages = messageResult.data.length
        }
      } catch (error) {
        console.error('获取统计数据时出错:', error)
      }
    },
    
    handleLogout() {
      this.$router.push('/admin/login')
    }
  },
  async mounted() {
    // 获取统计数据
    await this.fetchStats()
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
</style>