<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section company-info" data-aos="fade-up">
          <h3>科技企业</h3>
          <p>致力于科技创新与发展，为客户提供最优质的产品和服务。</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook"><FacebookIcon :size="18" /></a>
            <a href="#" class="social-link" aria-label="Twitter"><TwitterIcon :size="18" /></a>
            <a href="#" class="social-link" aria-label="Instagram"><InstagramIcon :size="18" /></a>
            <a href="#" class="social-link" aria-label="LinkedIn"><LinkedinIcon :size="18" /></a>
          </div>
        </div>
        <div class="footer-section quick-links" data-aos="fade-up" data-aos-delay="100">
          <h4>快速链接</h4>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
            <li><router-link to="/products">产品中心</router-link></li>
            <li><router-link to="/news">新闻资讯</router-link></li>
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>
        <div class="footer-section contact-info" data-aos="fade-up" data-aos-delay="200">
          <h4>联系方式</h4>
          <div class="contact-item">
            <span class="icon"><PhoneIcon :size="18" /></span>
            <span class="info">+86 123-4567-8900</span>
          </div>
          <div class="contact-item">
            <span class="icon"><MailIcon :size="18" /></span>
            <span class="info">info@techcompany.com</span>
          </div>
          <div class="contact-item">
            <span class="icon"><MapPinIcon :size="18" /></span>
            <span class="info">北京市朝阳区科技园区</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 科技企业. 保留所有权利.</p>
        <div class="footer-beian">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">京ICP备xxxxxxxx号-x</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=xxxxxxxxxx" target="_blank" rel="noopener">
            京公网安备 xxxxxxxxxxxxx号
          </a>
        </div>
        <div class="back-to-top" @click="scrollToTop">
          <span><ArrowUpIcon :size="16" /></span>
          <span>返回顶部</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// 导入lucide-vue-next图标
import { 
  FacebookIcon, 
  TwitterIcon, 
  InstagramIcon, 
  LinkedinIcon, 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon,
  ArrowUpIcon
} from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
    PhoneIcon,
    MailIcon,
    MapPinIcon,
    ArrowUpIcon
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  color: #333;
  padding: 40px 0 20px;
  margin-top: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e9ecef;
}

.footer-section h3,
.footer-section h4 {
  color: #2c3e50;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.footer-section p,
.footer-section li {
  color: #666;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 8px;
}

.footer-section a {
  text-decoration: none;
  color: #e0e0e0;
  transition: color 0.3s;
  position: relative;
}

/* 快速链接部分的链接使用蓝色 */
.quick-links a {
  color: #007bff;
}

.footer-section a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #42b983;
  transition: width 0.3s ease;
}

.footer-section a:hover {
  color: #42b983;
}

.footer-section a:hover::after {
  width: 100%;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: #666;
  transition: all 0.3s ease;
  text-decoration: none;
  border-radius: 4px;
}

.social-link:hover {
  color: #42b983;
  background-color: transparent;
  transform: translateY(-2px);
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.icon {
  font-size: 18px;
  margin-right: 15px;
  width: 24px;
  text-align: center;
}

.footer-bottom {
  border-top: 1px solid #e9ecef;
  padding-top: 20px;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.footer-beian {
  display: flex;
  gap: 20px;
  font-size: 14px;
}

.footer-beian a {
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color 0.3s ease;
}

.footer-beian a:hover {
  color: #42b983;
}


.back-to-top {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: #e9ecef;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 14px;
}

.back-to-top:hover {
  background-color: #42b983;
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .footer-section {
    min-width: 100%;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>