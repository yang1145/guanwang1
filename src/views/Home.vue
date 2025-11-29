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
            <div class="testimonial-header">
              <div class="client-avatar">
                <div class="avatar-placeholder">张</div>
              </div>
              <div class="client-details">
                <div class="client-name">张明</div>
                <div class="client-title">技术总监，某大型互联网公司</div>
              </div>
            </div>
            <p class="testimonial-text">"他们的技术团队专业且响应迅速，帮助我们解决了复杂的系统集成问题，大大提升了业务效率。"</p>
            <QuoteIcon class="quote-icon" />
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="200">
            <div class="testimonial-header">
              <div class="client-avatar">
                <div class="avatar-placeholder">李</div>
              </div>
              <div class="client-details">
                <div class="client-name">李华</div>
                <div class="client-title">CTO，某金融科技公司</div>
              </div>
            </div>
            <p class="testimonial-text">"合作三年来，他们始终能按时交付高质量的解决方案，是我们值得信赖的技术合作伙伴。"</p>
            <QuoteIcon class="quote-icon" />
          </div>
          
          <div class="testimonial-card" data-aos="fade-up" data-aos-delay="300">
            <div class="testimonial-header">
              <div class="client-avatar">
                <div class="avatar-placeholder">王</div>
              </div>
              <div class="client-details">
                <div class="client-name">王强</div>
                <div class="client-title">产品副总裁，某创业公司</div>
              </div>
            </div>
            <p class="testimonial-text">"从需求分析到项目交付，整个过程非常顺畅。他们的专业建议帮助我们优化了产品设计。"</p>
            <QuoteIcon class="quote-icon" />
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

<style scoped src="../assets/styles/home.css"></style>