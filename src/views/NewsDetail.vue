<template>
  <div class="news-detail">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="container">
        <h1 data-aos="fade-down">{{ news.title || '新闻详情' }}</h1>
        <p data-aos="fade-up" data-aos-delay="200">了解我们的最新动态</p>
      </div>
    </section>

    <section class="news-content">
      <div class="container">
        <article class="news-article" v-if="news.id">
          <header class="article-header" data-aos="fade-up">
            <h1>{{ news.title }}</h1>
            <div class="article-meta">
              <span class="news-date">{{ formatDate(news.created_at) }}</span>
              <span class="news-category">{{ news.category }}</span>
              <span class="news-views">浏览量: {{ news.views || 0 }}</span>
            </div>
          </header>

          <div class="article-content" data-aos="fade-up" data-aos-delay="100">
            <p class="lead">{{ news.content }}</p>
            
            <div class="article-body">
              <p>这是新闻的详细内容。新闻详情页面展示了完整的新闻内容，包括标题、发布时间、分类和浏览量等信息。我们致力于为客户提供最新的行业资讯和公司动态，帮助大家了解技术发展趋势和市场变化。</p>
              <p>如果您对我们的产品或服务有任何疑问，欢迎通过页面底部的联系方式与我们取得联系。我们的专业团队将竭诚为您服务，提供最优质的技术支持和解决方案。</p>
              <p>感谢您对我们公司的关注与支持，我们将继续努力创新，为客户提供更优质的产品和服务，共同推动行业发展。</p>
            </div>
          </div>

          <div class="article-actions" data-aos="fade-up" data-aos-delay="200">
            <router-link to="/news" class="btn btn-primary">返回新闻列表</router-link>
          </div>
        </article>
        
        <div class="loading" v-else-if="loading">
          <p>正在加载新闻内容...</p>
        </div>
        
        <div class="error" v-else-if="error">
          <p>{{ error }}</p>
          <router-link to="/news" class="btn btn-primary">返回新闻列表</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'

export default {
  name: 'NewsDetail',
  data() {
    return {
      headerImage: bg2,
      news: {},
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.fetchNews()
    this.animateOnScroll()
  },
  methods: {
    async fetchNews() {
      const newsId = this.$route.params.id
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`/api/news/${newsId}`)
        const result = await response.json()
        
        if (response.ok) {
          this.news = result.data
        } else {
          this.error = result.error || '获取新闻内容失败'
        }
      } catch (error) {
        console.error('获取新闻详情时出错:', error)
        this.error = '网络错误，请稍后重试'
      } finally {
        this.loading = false
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    },
    
    animateOnScroll() {
      const elements = document.querySelectorAll('[data-aos]')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target
            const animation = element.dataset.aos
            const delay = element.dataset.aosDelay || 0
            
            setTimeout(() => {
              element.classList.add('aos-animate')
            }, delay)
          }
        })
      }, {
        threshold: 0.1
      })
      
      elements.forEach(element => {
        observer.observe(element)
      })
    }
  }
}
</script>

<style scoped>
.news-detail {
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

.news-article {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.dark-mode .news-article {
  background: #2d2d2d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.article-header h1 {
  font-size: 2.2rem;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.3;
  position: relative;
  padding-bottom: 20px;
}

.article-header h1:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .article-header h1 {
  color: #e0e0e0;
}

.article-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.dark-mode .article-meta {
  border-bottom: 1px solid #3d3d3d;
}

.news-date,
.news-category,
.news-views {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
  border: 1px solid #eee;
}

.dark-mode .news-date,
.dark-mode .news-category,
.dark-mode .news-views {
  background: #2d2d2d;
  color: #aaa;
  border: 1px solid #3d3d3d;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 40px;
}

.dark-mode .article-content {
  color: #ccc;
}

.lead {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.dark-mode .lead {
  color: #e0e0e0;
  background: #2d2d2d;
  border-left: 4px solid #42b983;
}

.article-body p {
  margin-bottom: 20px;
}

.article-actions {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.dark-mode .article-actions {
  border-top: 1px solid #3d3d3d;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: #42b983;
  color: white;
  border: 1px solid #42b983;
}

.btn-primary:hover {
  background: #359c6d;
  border-color: #359c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading,
.error {
  text-align: center;
  padding: 50px 0;
}

.loading p,
.error p {
  font-size: 1.2rem;
  color: #666;
}

.dark-mode .loading p,
.dark-mode .error p {
  color: #aaa;
}

@media (max-width: 768px) {
  .article-header h1 {
    font-size: 1.8rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .article-content {
    font-size: 1rem;
  }
  
  .lead {
    font-size: 1.1rem;
  }
  
  .news-article {
    padding: 20px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
}
</style>