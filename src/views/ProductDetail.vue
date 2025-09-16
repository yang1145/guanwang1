<template>
  <div class="product-detail">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="container">
        <h1 data-aos="fade-down">{{ product.name || '产品详情' }}</h1>
        <p data-aos="fade-up" data-aos-delay="200">了解我们的产品详细信息</p>
      </div>
    </section>

    <section class="product-content">
      <div class="container">
        <div class="product-layout" v-if="product.id">
          <div class="product-gallery" data-aos="fade-right">
            <div class="main-image">
              <div class="placeholder-image">{{ product.name }}</div>
            </div>
          </div>

          <div class="product-info" data-aos="fade-left">
            <h2>{{ product.name }}</h2>
            <div class="product-meta">
              <span class="product-category">{{ getCategoryName(product.category) }}</span>
              <span class="product-date">发布时间: {{ formatDate(product.created_at) }}</span>
            </div>
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-details">
              <h3>产品特性</h3>
              <ul class="feature-list">
                <li v-for="(feature, index) in productFeatures" :key="index">
                  <span class="feature-icon">✓</span>
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <div class="product-actions">
              <button class="btn btn-primary" @click="contactUs">联系我们</button>
            </div>
          </div>
        </div>
        
        <div class="loading" v-else-if="loading">
          <p>正在加载产品信息...</p>
        </div>
        
        <div class="error" v-else-if="error">
          <p>{{ error }}</p>
          <router-link to="/products" class="btn btn-primary">返回产品中心</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'

export default {
  name: 'ProductDetail',
  data() {
    return {
      headerImage: bg2,
      product: {},
      loading: true,
      error: null,
      productFeatures: [
        '高性能架构设计，确保系统稳定运行',
        '易于集成和部署，降低实施成本',
        '完善的技术支持，提供全方位服务',
        '持续的功能更新，满足未来发展需求'
      ]
    }
  },
  async mounted() {
    await this.fetchProduct()
    this.animateOnScroll()
  },
  methods: {
    async fetchProduct() {
      const productId = this.$route.params.id
      this.loading = true
      this.error = null
      
      try {
        const response = await fetch(`/api/products/${productId}`)
        const result = await response.json()
        
        if (response.ok) {
          this.product = result.data
        } else {
          this.error = result.error || '获取产品信息失败'
        }
      } catch (error) {
        console.error('获取产品详情时出错:', error)
        this.error = '网络错误，请稍后重试'
      } finally {
        this.loading = false
      }
    },
    
    getCategoryName(category) {
      const categoryMap = {
        'ai': '人工智能',
        'cloud': '云计算',
        'iot': '物联网',
        'security': '安全'
      }
      return categoryMap[category] || category
    },
    
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('zh-CN')
    },
    
    contactUs() {
      // 滚动到页面底部或跳转到联系页面
      this.$router.push('/contact')
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
.product-detail {
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

.product-content {
  padding: 80px 0;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.product-gallery .main-image {
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 1.5rem;
  border-radius: 10px;
}

.dark-mode .product-gallery .main-image {
  background: linear-gradient(45deg, #3d3d3d, #2d2d2d);
  color: #aaa;
}

.product-info h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.product-info h2:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .product-info h2 {
  color: #e0e0e0;
}

.product-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.product-category,
.product-date {
  background: #f8f9fa;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
  border: 1px solid #eee;
}

.dark-mode .product-category,
.dark-mode .product-date {
  background: #2d2d2d;
  color: #aaa;
  border: 1px solid #3d3d3d;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #42b983;
}

.dark-mode .product-description {
  color: #aaa;
  background: #2d2d2d;
  border-left: 4px solid #42b983;
}

.product-details h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.product-details h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .product-details h3 {
  color: #e0e0e0;
}

.feature-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 30px;
}

.feature-list li {
  position: relative;
  padding: 10px 0 10px 30px;
  margin-bottom: 10px;
  color: #555;
  line-height: 1.6;
  border-bottom: 1px dashed #eee;
}

.dark-mode .feature-list li {
  color: #aaa;
  border-bottom: 1px dashed #3d3d3d;
}

.feature-icon {
  position: absolute;
  left: 0;
  top: 10px;
  width: 20px;
  height: 20px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

.product-actions {
  text-align: center;
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
  .product-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .product-gallery .main-image {
    height: 300px;
  }
  
  .product-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .product-info h2 {
    font-size: 1.7rem;
  }
  
  .product-details h3 {
    font-size: 1.3rem;
  }
}
</style>