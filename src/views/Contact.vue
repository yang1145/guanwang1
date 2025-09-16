<template>
  <div class="contact">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')', 'background-size': 'cover', 'background-position': 'center' }">
      <div class="container">
        <h1 data-aos="fade-down">联系我们</h1>
        <p data-aos="fade-up" data-aos-delay="200">我们随时准备为您提供帮助和支持</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="container">
        <div class="contact-layout">
          <div class="contact-info" data-aos="fade-right">
            <h2>联系信息</h2>
            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">
                  <MapPinIcon :size="24" />
                </div>
                <div class="contact-text">
                  <h3>公司地址</h3>
                  <p>北京市朝阳区科技园区</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <PhoneIcon :size="24" />
                </div>
                <div class="contact-text">
                  <h3>联系电话</h3>
                  <p>+86 123-4567-8900</p>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-icon">
                  <MailIcon :size="24" />
                </div>
                <div class="contact-text">
                  <h3>电子邮箱</h3>
                  <p>info@techcompany.com</p>
                </div>
              </div>
            </div>

            <div class="map-container" data-aos="fade-up">
              <div class="placeholder-map">地图位置</div>
            </div>
          </div>

          <div class="contact-form" data-aos="fade-left">
            <h2>发送消息</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">姓名</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  :class="{ 'error': errors.name }"
                  required
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              <div class="form-group">
                <label for="email">邮箱</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email" 
                  :class="{ 'error': errors.email }"
                  required
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
              <div class="form-group">
                <label for="phone">电话</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone"
                  :class="{ 'error': errors.phone }"
                >
                <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
              </div>
              <div class="form-group">
                <label for="message">消息内容</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  v-model="form.message" 
                  :class="{ 'error': errors.message }"
                  required
                ></textarea>
                <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
              </div>
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>
              <div v-if="submitStatus" :class="['submit-status', submitStatus.type]">
                {{ submitStatus.message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'
// 导入lucide-vue-next图标
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-vue-next'

export default {
  name: 'Contact',
  components: {
    MapPinIcon,
    PhoneIcon,
    MailIcon
  },
  data() {
    return {
      headerImage: bg2,
      form: {
        name: '',
        email: '',
        phone: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      submitStatus: null
    }
  },
  mounted() {
    this.animateOnScroll();
  },
  methods: {
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
    },
    validateForm() {
      this.errors = {};
      
      if (!this.form.name) {
        this.errors.name = '请输入您的姓名';
      }
      
      if (!this.form.email) {
        this.errors.email = '请输入您的邮箱';
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = '请输入有效的邮箱地址';
      }
      
      if (!this.form.message) {
        this.errors.message = '请输入消息内容';
      }
      
      // 电话号码验证（可选字段）
      if (this.form.phone && !/^(\+?86)?1[3-9]\d{9}$/.test(this.form.phone)) {
        this.errors.phone = '请输入有效的电话号码';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    async submitForm() {
      if (this.validateForm()) {
        this.isSubmitting = true;
        this.submitStatus = null;
        
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              message: this.form.message
            })
          });
          
          const result = await response.json();
          
          if (response.ok) {
            this.submitStatus = {
              type: 'success',
              message: '消息已发送！我们会尽快与您联系。'
            };
            // 重置表单
            this.form = {
              name: '',
              email: '',
              phone: '',
              message: ''
            };
          } else {
            this.submitStatus = {
              type: 'error',
              message: result.error || '发送失败，请稍后重试。'
            };
          }
        } catch (error) {
          console.error('提交表单时出错:', error);
          this.submitStatus = {
            type: 'error',
            message: '网络错误，请稍后重试。'
          };
        } finally {
          this.isSubmitting = false;
        }
      }
    }
  }
}
</script>

<style scoped>
.contact {
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

.contact-content {
  padding: 80px 0;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contact-info h2,
.contact-form h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #333;
  position: relative;
  padding-bottom: 15px;
}

/* 暗色模式下的标题样式 */
.dark-mode .contact-info h2,
.dark-mode .contact-form h2 {
  color: #e0e0e0;
}

.contact-info h2::after,
.contact-form h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .contact-info h2::after,
.dark-mode .contact-form h2::after {
  background-color: #42b983;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.contact-item {
  display: flex;
  gap: 20px;
}

.contact-icon {
  font-size: 1.5rem;
  min-width: 50px;
  color: #42b983;
}

.contact-text h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

/* 暗色模式下的文本标题样式 */
.dark-mode .contact-text h3 {
  color: #e0e0e0;
}

.contact-text p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 暗色模式下的段落样式 */
.dark-mode .contact-text p {
  color: #aaa;
}

.map-container {
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
}

.placeholder-map {
  background-color: #e9ecef;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #6c757d;
}

/* 暗色模式下的地图占位符样式 */
.dark-mode .placeholder-map {
  background-color: #3d3d3d;
  color: #aaa;
}

.contact-form .form-group {
  margin-bottom: 20px;
}

.contact-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

/* 暗色模式下的表单标签样式 */
.dark-mode .contact-form label {
  color: #e0e0e0;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.25);
}

.contact-form input.error,
.contact-form textarea.error {
  border-color: #dc3545;
}

.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  background: #359c6d;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.submit-status {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.submit-status.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.submit-status.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .contact-info h2,
  .contact-form h2 {
    font-size: 1.5rem;
  }
}
</style>