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
                <div class="news-image">
                  <div class="placeholder-image">{{ article.title }}</div>
                </div>
                <div class="news-info">
                  <div class="news-meta">
                    <span class="news-date">{{ article.date }}</span>
                    <span class="news-category">{{ article.category }}</span>
                  </div>
                  <h2 class="news-title">{{ article.title }}</h2>
                  <p class="news-excerpt">{{ article.excerpt }}</p>
                  <router-link :to="'/news/' + article.id" class="read-more">阅读全文 →</router-link>
                </div>
              </div>
            </transition-group>

            <div class="pagination" data-aos="fade-up">
              <button class="page-btn" :disabled="currentPage === 1" @click="prevPage">上一页</button>
              <div class="page-numbers">
                <button 
                  v-for="page in totalPages" 
                  :key="page" 
                  class="page-number"
                  :class="{ active: currentPage === page }"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
              </div>
              <button class="page-btn" :disabled="currentPage === totalPages" @click="nextPage">下一页</button>
            </div>
          </main>

          <aside class="news-sidebar" data-aos="fade-left" data-aos-delay="300">
            <div class="sidebar-widget">
              <h3>热门标签</h3>
              <div class="tags">
                <span 
                  v-for="tag in tags" 
                  :key="tag" 
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <div class="sidebar-widget">
              <h3>热门文章</h3>
              <div 
                v-for="(article, index) in popularArticles" 
                :key="article.id" 
                class="popular-article"
              >
                <span class="popular-rank">{{ index + 1 }}</span>
                <div class="popular-info">
                  <h4 class="popular-title">{{ article.title }}</h4>
                  <span class="popular-date">{{ article.date }}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'

export default {
  name: 'News',
  data() {
    return {
      headerImage: bg2,
      currentPage: 1,
      articlesPerPage: 3,
      allArticles: []
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
    }
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    fetchArticles() {
      // 模拟从API获取文章数据
      this.allArticles = [
        {
          id: 1,
          title: '公司发布全新AI智能分析平台',
          excerpt: '我们很高兴地宣布推出新一代AI智能分析平台，该平台基于深度学习技术，能够为企业提供更精准的数据分析和预测服务。',
          date: '2023-10-15',
          category: '产品发布'
        },
        {
          id: 2,
          title: '荣获年度科技创新企业奖',
          excerpt: '在刚刚结束的年度科技峰会上，我们公司荣获了年度科技创新企业奖，这是对我们多年来在技术创新方面的肯定。',
          date: '2023-10-01',
          category: '公司新闻'
        },
        {
          id: 3,
          title: '与知名大学建立产学研合作关系',
          excerpt: '我们与清华大学计算机科学与技术系签署战略合作协议，共同推进人工智能领域的研究与应用。',
          date: '2023-09-20',
          category: '合作'
        },
        {
          id: 4,
          title: '数据中心安全认证升级',
          excerpt: '我们的云服务平台成功通过ISO/IEC 27001:2013信息安全管理体系认证，为客户提供更安全可靠的服务保障。',
          date: '2023-09-05',
          category: '安全'
        },
        {
          id: 5,
          title: '扩大国际市场布局',
          excerpt: '公司在欧洲设立新的研发中心，进一步拓展国际市场，为全球客户提供本地化服务支持。',
          date: '2023-08-18',
          category: '国际化'
        },
        {
          id: 6,
          title: '发布新一代云计算解决方案',
          excerpt: '我们发布了全新的云计算解决方案，提供更高的性能和更强的安全性，满足企业日益增长的计算需求。',
          date: '2023-08-05',
          category: '产品发布'
        },
        {
          id: 7,
          title: '参与制定行业技术标准',
          excerpt: '公司技术专家受邀参与国家人工智能技术标准制定工作，为行业发展贡献专业力量。',
          date: '2023-07-22',
          category: '行业动态'
        },
        {
          id: 8,
          title: '启动校园招聘计划',
          excerpt: '2024年度校园招聘正式启动，计划招聘百名优秀技术人才，为公司发展注入新鲜血液。',
          date: '2023-07-10',
          category: '招聘'
        }
      ]
      
      this.tags = ['人工智能', '云计算', '物联网', '大数据', '安全', '创新', '合作']
      this.popularArticles = [
        {
          id: 1,
          title: 'AI技术在金融行业的应用前景',
          date: '2023-10-10'
        },
        {
          id: 2,
          title: '云计算助力企业数字化转型',
          date: '2023-09-25'
        },
        {
          id: 3,
          title: '物联网安全挑战与应对策略',
          date: '2023-09-10'
        }
      ]
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      this.currentPage = page
    }
  },
  watch: {
    currentPage() {
      // 当页面改变时，触发动画
      this.$nextTick(() => {
        // 确保DOM更新后执行
      })
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

.news-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.news-cards-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 暗色模式下的新闻卡片样式 */
.dark-mode .news-card {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* 新闻列表动画 */
.news-list-enter-active {
  transition: all 0.5s ease;
}

.news-list-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

.news-list-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.news-image {
  flex: 1;
  max-width: 300px;
}

.placeholder-image {
  background-color: #e9ecef;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #6c757d;
}

/* 暗色模式下的占位符图片样式 */
.dark-mode .placeholder-image {
  background-color: #3d3d3d;
  color: #aaa;
}

.news-info {
  flex: 2;
  padding: 25px;
  display: flex;
  flex-direction: column;
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.news-date {
  color: #666;
}

/* 暗色模式下的新闻日期样式 */
.dark-mode .news-date {
  color: #aaa;
}

.news-category {
  background-color: #42b983;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

.news-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

/* 暗色模式下的新闻标题样式 */
.dark-mode .news-title {
  color: #e0e0e0;
}

.news-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  flex: 1;
}

/* 暗色模式下的新闻摘要样式 */
.dark-mode .news-excerpt {
  color: #aaa;
}

.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  margin-top: auto;
}

.read-more:hover {
  color: #359c6d;
}

/* 暗色模式下的阅读更多链接样式 */
.dark-mode .read-more {
  color: #64b5f6;
}

.dark-mode .read-more:hover {
  color: #90caf9;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 40px;
}

.page-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  background-color: #f8f9fa;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: #42b983;
  color: white;
  transform: translateY(-2px);
}

/* 暗色模式下的分页按钮样式 */
.dark-mode .page-btn {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.dark-mode .page-btn:hover:not(:disabled) {
  background-color: #42b983;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 5px;
}

.page-number {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #f8f9fa;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-number:hover {
  background-color: #42b983;
  color: white;
}

.page-number.active {
  background-color: #42b983;
  color: white;
}

/* 暗色模式下的分页数字样式 */
.dark-mode .page-number {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.dark-mode .page-number:hover,
.dark-mode .page-number.active {
  background-color: #42b983;
}

.page-info {
  font-weight: 500;
  color: #333;
}

/* 暗色模式下的分页信息样式 */
.dark-mode .page-info {
  color: #e0e0e0;
}

.news-sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.sidebar-widget {
  background: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.sidebar-widget:hover {
  transform: translateX(5px);
}

/* 暗色模式下的侧边栏小部件样式 */
.dark-mode .sidebar-widget {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.sidebar-widget h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #f8f9fa;
}

/* 暗色模式下的侧边栏标题样式 */
.dark-mode .sidebar-widget h3 {
  color: #e0e0e0;
  border-bottom: 2px solid #3d3d3d;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background-color: #e9ecef;
  color: #333;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* 暗色模式下的标签样式 */
.dark-mode .tag {
  background-color: #3d3d3d;
  color: #e0e0e0;
}

.popular-article {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f8f9fa;
}

/* 暗色模式下的热门文章样式 */
.dark-mode .popular-article {
  border-bottom: 1px solid #3d3d3d;
}

.popular-article:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.popular-rank {
  background-color: #42b983;
  color: white;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}

.popular-info {
  flex: 1;
}

.popular-title {
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

/* 暗色模式下的热门文章标题样式 */
.dark-mode .popular-title {
  color: #e0e0e0;
}

.popular-date {
  font-size: 0.8rem;
  color: #666;
}

/* 暗色模式下的热门文章日期样式 */
.dark-mode .popular-date {
  color: #aaa;
}

@media (max-width: 992px) {
  .news-layout {
    grid-template-columns: 1fr;
  }

  .news-sidebar {
    grid-row: 1;
  }

  .news-card {
    flex-direction: column;
  }

  .news-image {
    max-width: 100%;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .news-content {
    padding: 60px 0;
  }

  .news-info {
    padding: 20px;
  }

  .news-title {
    font-size: 1.3rem;
  }

  .pagination {
    gap: 10px;
  }

  .page-btn {
    padding: 8px 15px;
  }
  
  .page-numbers {
    display: none;
  }
}
</style>