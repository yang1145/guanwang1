<template>
  <div class="home">
    <section class="hero">
      <div class="carousel">
        <div class="carousel-inner">
          <div 
            class="carousel-item" 
            :class="{ active: index === currentSlide }"
            v-for="(item, index) in carouselItems" 
            :key="index"
          >
            <div class="carousel-bg" :style="{ 'background-image': 'url(' + carouselImages[index] + ')' }"></div>
            <div class="carousel-caption">
              <h2 class="carousel-title">{{ item.title }}</h2>
              <p class="carousel-subtitle">{{ item.subtitle }}</p>
              <p class="carousel-description">{{ item.description }}</p>
              <div class="hero-buttons" data-aos="fade-up" data-aos-delay="400">
                <router-link to="/products" class="btn btn-primary">了解产品</router-link>
                <router-link to="/about" class="btn btn-secondary">关于我们</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-controls">
          <button class="carousel-btn prev" @click="prevSlide">‹</button>
          <button class="carousel-btn next" @click="nextSlide">›</button>
        </div>
        <div class="carousel-indicators">
          <span 
            v-for="(item, index) in carouselItems" 
            :key="index"
            :class="{ active: index === currentSlide }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <section class="features section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" data-aos="fade-up">核心优势</h2>
          <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">我们专注于为客户提供卓越的技术解决方案</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-aos="fade-up" data-aos-delay="100">
            <div class="feature-icon">
              <LightbulbIcon :size="48" />
            </div>
            <h3>技术创新</h3>
            <p>持续投入研发，掌握核心技术，保持行业领先地位</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon">
              <RocketIcon :size="48" />
            </div>
            <h3>高效交付</h3>
            <p>采用敏捷开发模式，确保项目按时高质量交付</p>
          </div>
          
          <div class="feature-card" data-aos="fade-up" data-aos-delay="300">
            <div class="feature-icon">
              <WrenchIcon :size="48" />
            </div>
            <h3>优质服务</h3>
            <p>提供7x24小时技术支持，确保系统稳定运行</p>
          </div>
        </div>
      </div>
    </section>

    <section class="news-preview section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" data-aos="fade-up">新闻资讯</h2>
          <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">了解我们的最新动态和发展历程</p>
          <router-link to="/news" class="more-news" data-aos="fade-up" data-aos-delay="200">查看更多新闻 ›</router-link>
        </div>
        
        <div class="news-grid">
          <div class="news-card" data-aos="fade-up" data-aos-delay="100">
            <div class="news-date">2023-07-15</div>
            <h3 class="news-title">公司发布全新一代AI解决方案</h3>
            <p class="news-excerpt">我们很高兴宣布推出基于最新人工智能技术的企业级解决方案...</p>
            <router-link to="/news/1" class="read-more">阅读更多</router-link>
          </div>
          
          <div class="news-card" data-aos="fade-up" data-aos-delay="200">
            <div class="news-date">2023-06-28</div>
            <h3 class="news-title">与国际知名企业达成战略合作</h3>
            <p class="news-excerpt">我们与全球知名科技公司签署战略合作协议，共同开拓海外市场...</p>
            <router-link to="/news/2" class="read-more">阅读更多</router-link>
          </div>
          
          <div class="news-card" data-aos="fade-up" data-aos-delay="300">
            <div class="news-date">2023-06-10</div>
            <h3 class="news-title">荣获年度创新企业大奖</h3>
            <p class="news-excerpt">凭借在技术创新和行业贡献方面的突出表现，公司荣获年度创新企业奖...</p>
            <router-link to="/news/3" class="read-more">阅读更多</router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="testimonials section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" data-aos="fade-up">客户评价</h2>
          <p class="section-subtitle" data-aos="fade-up" data-aos-delay="100">听听我们的客户怎么说</p>
        </div>
        
        <div class="testimonials-grid">
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="100">
            <QuoteIcon class="quote-icon" />
            <p class="testimonial-text">"他们的技术团队专业且响应迅速，帮助我们解决了复杂的系统集成问题，大大提升了业务效率。"</p>
            <div class="client-info">
              <div class="client-avatar">
                <div class="avatar-placeholder">张</div>
              </div>
              <div class="client-details">
                <div class="client-name">张明</div>
                <div class="client-title">技术总监，某大型互联网公司</div>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
            <QuoteIcon class="quote-icon" />
            <p class="testimonial-text">"合作三年来，他们始终能按时交付高质量的解决方案，是我们值得信赖的技术合作伙伴。"</p>
            <div class="client-info">
              <div class="client-avatar">
                <div class="avatar-placeholder">李</div>
              </div>
              <div class="client-details">
                <div class="client-name">李华</div>
                <div class="client-title">CTO，某金融科技公司</div>
              </div>
            </div>
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
            <QuoteIcon class="quote-icon" />
            <p class="testimonial-text">"从需求分析到项目交付，整个过程非常顺畅。他们的专业建议帮助我们优化了产品设计。"</p>
            <div class="client-info">
              <div class="client-avatar">
                <div class="avatar-placeholder">王</div>
              </div>
              <div class="client-details">
                <div class="client-name">王强</div>
                <div class="client-title">产品副总裁，某创业公司</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// 导入轮播图背景图片
import bg1 from '../assets/images/bg1.jpg'
import bg2 from '../assets/images/bg2.jpg'
import bg3 from '../assets/images/bg3.jpg'
// 导入lucide-vue-next图标
import { LightbulbIcon, RocketIcon, WrenchIcon, QuoteIcon } from 'lucide-vue-next'

export default {
  name: 'Home',
  components: {
    LightbulbIcon,
    RocketIcon,
    WrenchIcon,
    QuoteIcon
  },
  data() {
    return {
      currentSlide: 0,
      carouselItems: [
        { 
          title: '引领科技创新', 
          subtitle: '我们致力于为客户提供最前沿的技术解决方案',
          description: '通过持续的研发投入和技术创新，我们帮助企业实现数字化转型，提升业务效率和竞争力。'
        },
        { 
          title: '专业团队支持', 
          subtitle: '汇聚行业精英，打造顶尖技术团队',
          description: '我们的团队由经验丰富的工程师和设计师组成，为客户提供专业的技术支持和咨询服务。'
        },
        { 
          title: '全球服务网络', 
          subtitle: '服务网络遍布全球，提供本地化支持',
          description: '我们在全球多个地区设有办事处和服务网点，能够快速响应客户需求，提供本地化服务支持。'
        }
      ],
      // 轮播图背景图片数组
      carouselImages: [bg1, bg2, bg3]
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.carouselItems.length) % this.carouselItems.length;
    },
    // 点击指示器跳转到指定幻灯片
    goToSlide(index) {
      this.currentSlide = index;
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
  },
  mounted() {
    this.animateOnScroll();
    
    // 自动轮播
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}
</script>

<style scoped>
.home {
  flex: 1;
}

.section {
  padding: 80px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .section-title {
  color: #e0e0e0;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.dark-mode .section-subtitle {
  color: #aaa;
}

.hero {
  position: relative;
  color: white;
  padding: 250px 0;
  animation: fadeIn 0.8s ease-out;
}

/* 轮播图样式 */
.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-item.active {
  opacity: 1;
}

.carousel-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 20px;
  z-index: 10;
}

.carousel-btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-indicators span.active {
  background: white;
  transform: scale(1.2);
}

/* 轮播图标题样式 */
.carousel-caption {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  color: white;
  width: 80%;
  max-width: 800px;
  padding: 20px;
}

.carousel-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.carousel-subtitle {
  font-size: 1.2rem;
  margin-bottom: 10px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.carousel-description {
  font-size: 1rem;
  margin-bottom: 30px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.4s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background-color: #42b983;
  color: white;
}

.btn-primary:hover {
  background-color: #359c6d;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.features {
  background-color: #f8f9fa;
}

.dark-mode .features {
  background-color: #252525;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  border: 1px solid #eee;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.dark-mode .feature-card {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.dark-mode .feature-card:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

.dark-mode .feature-card h3 {
  color: #e0e0e0;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.dark-mode .feature-card p {
  color: #aaa;
}

.news-preview {
  background-color: #f8f9fa;
}

.dark-mode .news-preview {
  background-color: #252525;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  padding: 20px;
  box-shadow: none;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #42b983;
}

.dark-mode .news-card {
  background: #2d2d2d;
  border: 1px solid #3d3d3d;
}

.dark-mode .news-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-color: #64b5f6;
}

.news-date {
  color: #42b983;
  font-size: 0.85rem;
  margin-bottom: 8px;
  display: block;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.news-card h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: #2c3e50;
  line-height: 1.4;
  font-weight: 600;
}

.dark-mode .news-card h3 {
  color: #e0e0e0;
}

.news-excerpt {
  color: #555;
  line-height: 1.6;
  margin-bottom: 16px;
  font-size: 0.9rem;
}

.dark-mode .news-excerpt {
  color: #bbb;
}

.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 8px 0;
  border-bottom: 1px solid transparent;
}

.read-more:hover {
  color: #359c6d;
  border-bottom-color: #359c6d;
}

.dark-mode .read-more {
  color: #64b5f6;
}

.dark-mode .read-more:hover {
  color: #90caf9;
  border-bottom-color: #90caf9;
}

.more-news {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  display: inline-block;
  margin-top: 20px;
  font-size: 1.1rem;
}

.more-news:hover {
  color: #359c6d;
}

.dark-mode .more-news {
  color: #64b5f6;
}

.dark-mode .more-news:hover {
  color: #90caf9;
}

.testimonials {
  background-color: #f8f9fa;
}

.dark-mode .testimonials {
  background-color: #252525;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s ease;
  border: 1px solid #eee;
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.dark-mode .testimonial-card {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.dark-mode .testimonial-card:hover {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.quote-icon {
  font-size: 4rem;
  color: rgba(66, 185, 131, 0.2);
  position: absolute;
  top: -20px;
  left: 20px;
  font-family: Georgia, serif;
}

.testimonial-text {
  color: #333;
  line-height: 1.8;
  margin-bottom: 20px;
  font-style: italic;
  padding-top: 30px;
}

.dark-mode .testimonial-text {
  color: #e0e0e0;
}

.client-info {
  display: flex;
  align-items: center;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  flex-shrink: 0;
  background: linear-gradient(135deg, #42b983, #64b5f6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.avatar-placeholder {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.client-details {
  flex: 1;
}

.client-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.dark-mode .client-name {
  color: #e0e0e0;
}

.client-title {
  color: #666;
  font-size: 0.9rem;
}

.dark-mode .client-title {
  color: #aaa;
}

@media (max-width: 768px) {
  .section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 1.7rem;
  }
  
  .carousel-title {
    font-size: 1.8rem;
  }
  
  .carousel-subtitle {
    font-size: 1rem;
  }
  
  .carousel-caption {
    top: 25%;
    width: 90%;
  }
  
  .hero {
    padding: 60px 0;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .news-grid,
  .testimonials-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonial-card {
    text-align: center;
  }
  
  .client-info {
    flex-direction: column;
    text-align: center;
  }
  
  .client-avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .quote-icon {
    left: 50%;
    transform: translateX(-50%);
  }
}

/* 添加动画相关样式 */
[data-aos] {
  transition: all 0.6s ease;
}
</style>