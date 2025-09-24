<template>
  <div class="products">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="container">
        <h1 data-aos="fade-down">产品中心</h1>
        <p data-aos="fade-up" data-aos-delay="200">我们提供创新的技术解决方案和服务</p>
      </div>
    </section>

    <section class="product-categories">
      <div class="container">
        <div class="category-filter" data-aos="fade-up">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-btn', { active: activeCategory === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <div class="products-grid">
          <div 
            v-for="(product, index) in filteredProducts" 
            :key="product.id" 
            class="product-card"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div class="product-image">
              <div class="placeholder-image">{{ product.name }}</div>
            </div>
            <div class="product-info">
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-actions">
                <router-link :to="'/products/' + product.id" class="btn btn-primary">了解更多</router-link>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 当没有产品时显示 -->
        <div v-if="filteredProducts.length === 0" class="no-products" data-aos="fade-up">
          <p>暂无相关产品</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'
import { getApiUrl } from '../api.js'

export default {
  name: 'Products',
  data() {
    return {
      headerImage: bg2,
      activeCategory: 'all',
      categories: [
        { id: 'all', name: '全部产品' }
      ],
      products: []
    }
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === 'all') {
        return this.products
      }
      return this.products.filter(product => product.category === this.activeCategory)
    }
  },
  async mounted() {
    await this.fetchProducts()
    this.animateOnScroll();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await fetch(getApiUrl('/api/products'))
        const result = await response.json()
        if (response.ok) {
          this.products = result.data
          
          // 根据获取的产品数据动态生成分类
          const uniqueCategories = [...new Set(result.data.map(product => product.category))]
          this.categories = [{ id: 'all', name: '全部产品' }]
          
          // 为每个分类添加中文名称映射
          uniqueCategories.forEach(category => {
            let categoryName = category
            switch(category) {
              case 'ai':
                categoryName = '人工智能'
                break
              case 'cloud':
                categoryName = '云计算'
                break
              case 'iot':
                categoryName = '物联网'
                break
              case 'security':
                categoryName = '安全'
                break
              default:
                categoryName = category
            }
            this.categories.push({ id: category, name: categoryName })
          })
        } else {
          console.error('获取产品失败:', result.error)
          this.useMockData()
        }
      } catch (error) {
        console.error('获取产品时出错:', error)
        this.useMockData()
      }
    },
    
    useMockData() {
      this.products = [
        {
          id: 1,
          name: '智能分析平台',
          description: '基于深度学习的智能数据分析和预测平台，帮助企业洞察业务趋势。',
          category: 'ai'
        },
        {
          id: 2,
          name: '云服务器',
          description: '高性能、高可用性的云计算基础设施服务，支持弹性扩展。',
          category: 'cloud'
        },
        {
          id: 3,
          name: '物联网网关',
          description: '连接各类IoT设备的智能网关解决方案，实现设备统一管理。',
          category: 'iot'
        },
        {
          id: 4,
          name: '数据加密系统',
          description: '企业级数据加密和隐私保护解决方案，确保数据安全。',
          category: 'security'
        },
        {
          id: 5,
          name: '机器学习平台',
          description: '一站式机器学习开发和部署平台，加速AI项目落地。',
          category: 'ai'
        },
        {
          id: 6,
          name: '容器服务',
          description: '基于Kubernetes的容器化应用管理服务，简化应用部署。',
          category: 'cloud'
        },
        {
          id: 7,
          name: '边缘计算设备',
          description: '边缘计算解决方案，降低延迟并提高数据处理效率。',
          category: 'iot'
        },
        {
          id: 8,
          name: '网络安全防护',
          description: '全方位网络安全防护体系，抵御各类网络攻击。',
          category: 'security'
        }
      ]
      
      this.categories = [
        { id: 'all', name: '全部产品' },
        { id: 'ai', name: '人工智能' },
        { id: 'cloud', name: '云计算' },
        { id: 'iot', name: '物联网' },
        { id: 'security', name: '安全' }
      ]
    },
    
    setActiveCategory(categoryId) {
      this.activeCategory = categoryId
    },
    animateOnScroll() {
      const elements = document.querySelectorAll('[data-aos]');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const animation = element.dataset.aos;
            const delay = element.dataset.aosDelay || 0;
            
            setTimeout(() => {
              element.classList.add('aos-animate');
            }, delay);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    }
  }
}
</script>

<style scoped>
.products {
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

.product-categories {
  padding: 80px 0;
}

.category-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
}

.category-btn {
  padding: 10px 20px;
  background: #f8f9fa;
  border: 1px solid #eee;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  color: #333;
}

.dark-mode .category-btn {
  background: #2d2d2d;
  border: 1px solid #3d3d3d;
  color: #e0e0e0;
}

.category-btn:hover,
.category-btn.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
  opacity: 0;
  transform: translateY(20px);
}

.dark-mode .product-card {
  background: #2d2d2d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.product-card.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.dark-mode .product-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.product-image {
  height: 200px;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.dark-mode .product-image {
  background: linear-gradient(45deg, #3d3d3d, #2d2d2d);
  color: #aaa;
}

.placeholder-image {
  font-size: 1.2rem;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 1.3rem;
  margin: 0 0 10px 0;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.product-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .product-title {
  color: #e0e0e0;
}

.product-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.dark-mode .product-description {
  color: #aaa;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
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

.no-products {
  text-align: center;
  padding: 50px 0;
  color: #666;
  font-size: 1.2rem;
  grid-column: 1 / -1;
}

.dark-mode .no-products {
  color: #aaa;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .page-header p {
    font-size: 1rem;
  }
  
  .category-filter {
    gap: 10px;
  }
  
  .category-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>