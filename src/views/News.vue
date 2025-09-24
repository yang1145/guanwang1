<template>
  <div class="news">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="container">
        <h1 data-aos="fade-down">新闻资讯</h1>
        <p data-aos="fade-up" data-aos-delay="200">了解我们的最新动态和发展历程</p>
      </div>
    </section>

    <section class="news-content">
      <div class="container">
        <div class="news-layout">
          <main class="news-main">
            <transition-group name="news-list" tag="div" class="news-cards-container">
              <div 
                v-for="(article, index) in paginatedArticles" 
                :key="article.id" 
                class="news-card"
                :data-aos="index < 3 ? 'fade-up' : ''"
                :data-aos-delay="index * 100"
              >
                <div class="news-card-content">
                  <div class="news-image">
                    <div class="placeholder-image">{{ article.title }}</div>
                  </div>
                  <div class="news-info">
                  <h2 class="news-title">{{ article.title }}</h2>
                  <p class="news-excerpt">{{ getExcerpt(article.content, 100) }}</p>
                  <div class="news-meta">
                    <span class="news-date">
                      <CalendarIcon :size="16" />
                      {{ formatDate(article.created_at) }}
                    </span>
                    <span class="news-category">
                      <TagIcon :size="16" />
                      {{ article.category }}
                    </span>
                  </div>
                  <div class="news-actions">
                    <router-link :to="'/news/' + article.id" class="read-more">
                      阅读全文 
                      <ArrowRightIcon :size="16" />
                    </router-link>
                  </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <div class="pagination" data-aos="fade-up">
              <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">
                <ChevronLeftIcon :size="16" />
                <span>上一页</span>
              </button>
              
              <div class="page-numbers">
                <!-- 首页按钮 -->
                <button 
                  v-if="totalPages > 1 && currentPage > 2"
                  class="page-number"
                  @click="goToPage(1)"
                >
                  1
                </button>
                
                <!-- 当前页面距离首页超过2页时显示省略号 -->
                <span v-if="currentPage > 3" class="page-ellipsis">
                  ...
                </span>
                
                <!-- 中间页码按钮 -->
                <button 
                  v-for="page in visiblePages" 
                  :key="page" 
                  class="page-number"
                  :class="{ active: currentPage === page }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
                
                <!-- 当前页面距离末页超过2页时显示省略号 -->
                <span v-if="currentPage < totalPages - 2 && totalPages > 3" class="page-ellipsis">
                  ...
                </span>
                
                <!-- 末页按钮 -->
                <button 
                  v-if="totalPages > 1 && currentPage < totalPages - 1"
                  class="page-number"
                  @click="goToPage(totalPages)"
                >
                  {{ totalPages }}
                </button>
              </div>
              
              <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">
                <span>下一页</span>
                <ChevronRightIcon :size="16" />
              </button>
            </div>
          </main>

          <aside class="news-sidebar" data-aos="fade-left" data-aos-delay="300">
            <div class="sidebar-widget">
              <h3>
                <HashIcon :size="20" />
                热门标签
              </h3>
              <div class="tags">
                <span 
                  v-for="tag in tags" 
                  :key="tag" 
                  class="tag"
                  @click="filterByTag(tag)"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="sidebar-widget">
              <h3>
                <TrendingUpIcon :size="20" />
                热门文章
              </h3>
              <div 
                v-for="(article, index) in popularArticles" 
                :key="article.id" 
                class="popular-article"
                @click="goToArticle(article.id)"
              >
                <span class="popular-rank">{{ index + 1 }}</span>
                <div class="popular-info">
                  <h4 class="popular-title">{{ article.title }}</h4>
                  <div class="popular-meta">
                    <span class="popular-date">
                      <CalendarIcon :size="12" />
                      {{ formatDate(article.created_at) }}
                    </span>
                    <span class="popular-views">
                      <EyeIcon :size="12" />
                      {{ article.views || 0 }} 浏览
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="sidebar-widget">
              <h3>
                <InfoIcon :size="20" />
                关于我们
              </h3>
              <div class="about-widget">
                <p>我们是一家专注于技术创新的科技企业，致力于为客户提供最优质的产品和服务。</p>
                <router-link to="/about" class="widget-link">了解更多 →</router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { CalendarIcon, TagIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import bg3 from '../assets/images/bg3.jpg'
import { getApiUrl } from '../api.js'

export default {
  name: 'News',
  components: {
    CalendarIcon,
    TagIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data() {
    return {
      headerImage: bg3,
      allArticles: [],
      currentPage: 1,
      articlesPerPage: 6,
      maxVisiblePages: 5,
      tags: [],
      popularArticles: []
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allArticles.length / this.articlesPerPage)
    },
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.articlesPerPage
      const endIndex = startIndex + this.articlesPerPage
      return this.allArticles.slice(startIndex, endIndex)
    },
    visiblePages() {
      const halfVisible = Math.floor(this.maxVisiblePages / 2)
      let start = Math.max(1, this.currentPage - halfVisible)
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1)
      
      // Adjust start if end is at the maximum
      if (end - start + 1 < this.maxVisiblePages) {
        start = Math.max(1, end - this.maxVisiblePages + 1)
      }
      
      const pages = []
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    // 监听路由变化
    '$route.query.page': {
      handler(newPage) {
        const page = parseInt(newPage) || 1
        // 在数据加载前也允许设置页面，但限制最小值为1
        this.currentPage = Math.max(1, page)
      },
      immediate: true
    },
    // 监听文章数据变化，确保页面在有效范围内
    allArticles: {
      handler() {
        // 确保当前页面不超过总页数
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
          this.currentPage = this.totalPages
        }
        // 如果当前页面是1但是路由中有page参数，则根据路由更新
        if (this.currentPage === 1 && this.$route.query.page) {
          const page = parseInt(this.$route.query.page) || 1
          if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchArticles()
    this.fetchPopularArticles()
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await fetch(getApiUrl('/api/news'))
        const result = await response.json()
        if (response.ok) {
          // 正确处理API响应数据结构
          this.allArticles = result.data || []
          // 生成标签数据
          if (result.data && result.data.length > 0) {
            this.tags = [...new Set(result.data.map(article => article.category))]
          }
        } else {
          console.error('获取新闻失败:', result.error)
          // 出错时使用模拟数据
          this.useMockData()
        }
      } catch (error) {
        console.error('获取新闻时出错:', error)
        // 出错时使用模拟数据
        this.useMockData()
      }
    },
    
    async fetchPopularArticles() {
      try {
        const response = await fetch(getApiUrl('/api/news/popular'))
        const result = await response.json()
        if (response.ok) {
          this.popularArticles = result.data || []
        } else {
          console.error('获取热门新闻失败:', result.error)
        }
      } catch (error) {
        console.error('获取热门新闻时出错:', error)
      }
    },
    
    useMockData() {
      // 模拟从API获取文章数据
      this.allArticles = [
        {
          id: 1,
          title: '公司发布全新AI智能分析平台',
          content: '我们很高兴地宣布推出新一代AI智能分析平台，该平台基于深度学习技术，能够为企业提供更精准的数据分析和预测服务。通过这一创新产品，企业可以更好地理解市场趋势，优化业务决策，提升竞争力。',
          created_at: '2023-10-15',
          category: '产品发布'
        },
        {
          id: 2,
          title: '荣获年度科技创新企业奖',
          content: '在刚刚结束的年度科技峰会上，我们公司荣获了年度科技创新企业奖，这是对我们多年来在技术创新方面的肯定。此次获奖不仅是对我们过去努力的认可，更是对未来发展的激励。',
          created_at: '2023-10-01',
          category: '公司新闻'
        },
        {
          id: 3,
          title: '与知名大学建立产学研合作关系',
          content: '我们与清华大学计算机科学与技术系签署战略合作协议，共同推进人工智能领域的研究与应用。这一合作将促进学术界与产业界的深度融合，推动技术创新和人才培养。',
          created_at: '2023-09-20',
          category: '合作'
        },
        {
          id: 4,
          title: '数据中心安全认证升级',
          content: '我们的云服务平台成功通过ISO/IEC 27001:2013信息安全管理体系认证，为客户提供更安全可靠的服务保障。这一认证标志着我们在信息安全方面达到了国际先进水平。',
          created_at: '2023-09-05',
          category: '安全'
        },
        {
          id: 5,
          title: '扩大国际市场布局',
          content: '公司在欧洲设立新的研发中心，进一步拓展国际市场，为全球客户提供本地化服务支持。这一举措将加强我们在国际市场的竞争力，更好地服务全球客户。',
          created_at: '2023-08-18',
          category: '国际化'
        },
        {
          id: 6,
          title: '发布新一代云计算解决方案',
          content: '我们发布了全新的云计算解决方案，提供更高的性能和更强的安全性，满足企业日益增长的计算需求。该解决方案采用最新的虚拟化技术，为企业提供灵活、可靠的云服务。',
          created_at: '2023-08-05',
          category: '产品发布'
        },
        {
          id: 7,
          title: '参与制定行业技术标准',
          content: '公司技术专家受邀参与国家人工智能技术标准制定工作，为行业发展贡献专业力量。通过参与标准制定，我们将推动行业技术规范的完善，促进行业健康发展。',
          created_at: '2023-07-22',
          category: '行业动态'
        },
        {
          id: 8,
          title: '启动校园招聘计划',
          content: '2024年度校园招聘正式启动，计划招聘百名优秀技术人才，为公司发展注入新鲜血液。我们致力于为年轻人才提供广阔的发展平台，共同推动技术创新。',
          created_at: '2023-07-10',
          category: '招聘'
        }
      ]
      
      this.tags = ['人工智能', '云计算', '物联网', '大数据', '安全', '创新', '合作']
      this.popularArticles = [
        {
          id: 1,
          title: 'AI技术在金融行业的应用前景',
          created_at: '2023-10-10',
          views: 128
        },
        {
          id: 2,
          title: '云计算助力企业数字化转型',
          created_at: '2023-09-25',
          views: 96
        },
        {
          id: 3,
          title: '物联网安全挑战与应对策略',
          created_at: '2023-09-10',
          views: 87
        },
        {
          id: 4,
          title: '大数据分析在零售业的应用',
          created_at: '2023-08-30',
          views: 75
        }
      ]
    },
    
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    getExcerpt(content, length) {
      if (!content) return ''
      return content.length > length ? content.substring(0, length) + '...' : content
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1)
      }
    },
    goToPage(page) {
      // 确保页码在有效范围内
      if (page < 1) page = 1
      if (page > this.totalPages && this.totalPages > 0) page = this.totalPages
      
      // 更新路由参数
      this.$router.push({
        query: { ...this.$route.query, page: page }
      }).then(() => {
        // 更新当前页
        this.currentPage = page
        
        // 在路由更新完成后滚动到页面顶部
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }).catch(err => {
        // 即使路由更新失败也尝试更新页面和滚动到顶部
        console.error('路由更新错误:', err)
        this.currentPage = page
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
    },
    filterByTag(tag) {
      // 这里可以添加按标签筛选的逻辑
      console.log('筛选标签:', tag)
    },
    goToArticle(id) {
      this.$router.push(`/news/${id}`)
    }
  }
}
</script>

<style scoped>
.news {
  flex: 1;
}

.page-header {
  background: no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: black;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.page-header p {
  font-size: 1.2rem;
  opacity: 0.9;
  color: black;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
}

.news-content {
  padding: 80px 0;
}

.news-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  transition: all 0.3s ease;
  border: 1px solid #eee;
  opacity: 1; /* 修改默认透明度为1，确保新闻卡片可见 */
  transform: translateY(0);
}

.news-card-content {
  display: flex;
  flex-direction: row;
  align-items: stretch; /* 确保子元素高度拉伸以填满容器 */
}

.news-image {
  flex: 0 0 30%; /* 左侧图片占30%宽度 */
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.dark-mode .news-image {
  background: linear-gradient(45deg, #3d3d3d, #2d2d2d);
  color: #aaa;
}

.placeholder-image {
  font-size: 0.9rem;
  text-align: center;
  padding: 15px;
}

.news-info {
  flex: 0 0 70%; /* 右侧信息占70%宽度 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 将内容均匀分布在容器中 */
}

.dark-mode .news-card {
  background: #2d2d2d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

/* 移除动画初始状态，确保新闻卡片始终可见 */
.news-card.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.dark-mode .news-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.news-date,
.news-category {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #eee;
}

.dark-mode .news-date,
.dark-mode .news-category {
  background: #2d2d2d;
  color: #aaa;
  border: 1px solid #3d3d3d;
}

.news-title {
  font-size: 1.3rem;
  margin: 0 0 12px 0;
  color: #333;
  position: relative;
  padding-bottom: 12px;
  line-height: 1.4;
  flex-grow: 1; /* 允许标题区域扩展 */
}

.news-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}

.dark-mode .news-title {
  color: #e0e0e0;
}

.news-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
  flex-grow: 1; /* 允许摘要区域扩展 */
}

.dark-mode .news-excerpt {
  color: #aaa;
}

.news-actions {
  text-align: right;
  margin-top: auto; /* 将操作按钮推到底部 */
}

.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid rgba(66, 185, 131, 0.3);
  font-size: 0.9rem;
}

.read-more:hover {
  color: white;
  background-color: #42b983;
  transform: translateX(5px);
  border-color: #42b983;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-btn,
.page-number {
  padding: 8px 14px;
  border: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.dark-mode .page-btn,
.dark-mode .page-number {
  border: 1px solid #3d3d3d;
  background: #2d2d2d;
  color: #e0e0e0;
}

.page-btn:hover:not(:disabled),
.page-number:hover,
.page-number.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
}

.page-btn:disabled {
  background: #f0f0f0;
  color: #999;
  cursor: not-allowed;
}

.dark-mode .page-btn:disabled {
  background: #3d3d3d;
  color: #666;
}

.page-ellipsis {
  padding: 8px 5px;
  color: #999;
}

.news-sidebar {
  position: sticky;
  top: 20px;
}

.sidebar-widget {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.dark-mode .sidebar-widget {
  background: #2d2d2d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.sidebar-widget:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark-mode .sidebar-widget:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sidebar-widget h3 {
  font-size: 1.3rem;
  margin: 0 0 20px 0;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-widget h3:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #42b983;
  border-radius: 3px;
}

.dark-mode .sidebar-widget h3 {
  color: #e0e0e0;
  border-bottom: 1px solid #3d3d3d;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: #f8f9fa;
  padding: 6px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.dark-mode .tag {
  background: #2d2d2d;
  color: #aaa;
  border: 1px solid #3d3d3d;
}

.tag:hover {
  background: #42b983;
  color: white;
  border-color: #42b983;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(66, 185, 131, 0.3);
}

.popular-article {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  padding: 15px;
}

.dark-mode .popular-article {
  border-bottom: 1px solid #3d3d3d;
}

.popular-article:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.popular-article:hover {
  background-color: rgba(66, 185, 131, 0.05);
  transform: translateX(5px);
}

.dark-mode .popular-article:hover {
  background-color: rgba(66, 185, 131, 0.1);
}

.popular-rank {
  background: #42b983;
  color: white;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
  font-weight: bold;
}

.popular-info {
  flex: 1;
}

.popular-title {
  font-size: 1rem;
  margin: 0 0 8px 0;
  color: #333;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.popular-article:hover .popular-title {
  color: #42b983;
}

.dark-mode .popular-title {
  color: #e0e0e0;
}

.popular-meta {
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: #999;
}

.dark-mode .popular-meta {
  color: #777;
}

.popular-date,
.popular-views {
  display: flex;
  align-items: center;
  gap: 5px;
}

.about-widget p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.dark-mode .about-widget p {
  color: #aaa;
}

.widget-link {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.widget-link:hover {
  color: #359c6d;
  text-decoration: underline;
  transform: translateX(3px);
}

@media (max-width: 768px) {
  .news-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .news-card {
    margin-bottom: 20px;
  }
  
  .news-card-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .news-image {
    height: 180px;
    flex: 0 0 auto;
  }
  
  .news-info {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .news-meta {
    flex-direction: column;
    gap: 8px;
  }
  
  .pagination {
    gap: 8px;
  }
  
  .page-btn span,
  .page-number span {
    display: none;
  }
  
  .page-btn {
    padding: 10px;
  }
  
  .page-ellipsis {
    display: none;
  }
  
  .page-header {
    padding: 60px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .news-content {
    padding: 50px 0;
  }
  
  .news-info {
    padding: 20px;
  }
  
  .news-title {
    font-size: 1.2rem;
  }
  
  .popular-meta {
    flex-direction: column;
    gap: 5px;
  }
  
  .sidebar-widget {
    padding: 20px;
  }
}
</style>