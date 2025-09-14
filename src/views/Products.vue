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

export default {
  name: 'Products',
  data() {
    return {
      headerImage: bg2,
      activeCategory: 'all',
      categories: [
        { id: 'all', name: '全部产品' },
        { id: 'ai', name: '人工智能' },
        { id: 'cloud', name: '云计算' },
        { id: 'iot', name: '物联网' },
        { id: 'security', name: '安全' }
      ],
      products: [
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
  mounted() {
    this.animateOnScroll();
  },
  methods: {
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
  padding: 10px 25px;
  border: none;
  border-radius: 30px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover,
.category-btn.active {
  background-color: #42b983;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 暗色模式下的分类按钮样式 */
.dark-mode .category-btn {
  background-color: #2d2d2d;
  color: #e0e0e0;
}

.dark-mode .category-btn:hover,
.dark-mode .category-btn.active {
  background-color: #42b983;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

/* 暗色模式下的产品卡片样式 */
.dark-mode .product-card {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.product-image {
  height: 200px;
  overflow: hidden;
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

.product-info {
  padding: 25px;
}

.product-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

/* 暗色模式下的产品标题样式 */
.dark-mode .product-title {
  color: #e0e0e0;
}

.product-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* 暗色模式下的产品描述样式 */
.dark-mode .product-description {
  color: #aaa;
}

.product-actions {
  margin-top: 15px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #359c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 暗色模式下的按钮样式 */
.dark-mode .btn-primary {
  background-color: #64b5f6;
  color: #1a1a1a;
}

.dark-mode .btn-primary:hover {
  background-color: #90caf9;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.2rem;
}

/* 暗色模式下的无产品提示样式 */
.dark-mode .no-products {
  color: #aaa;
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

  .product-categories {
    padding: 60px 0;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .category-filter {
    gap: 10px;
  }

  .category-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
  
  .product-info {
    padding: 20px;
  }
  
  .product-title {
    font-size: 1.3rem;
  }
}
</style>