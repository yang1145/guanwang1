<template>
  <div id="app">
    <Header :company-name="siteConfig.company_name" />
    <transition :name="$route.meta.transition || 'fade'" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <Footer :site-config="siteConfig" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { getApiUrl } from './api.js'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      siteConfig: {
        company_name: '科技企业', // 默认值
        site_title: '科技企业官网', // 默认标题
        icp_number: '',
        police_number: '',
        copyright_info: '版权所有 © 2023 科技企业. 保留所有权利.'
      }
    }
  },
  async mounted() {
    await this.fetchSiteConfig()
  },
  methods: {
    async fetchSiteConfig() {
      try {
        const response = await fetch(getApiUrl('/api/site-config'))
        const result = await response.json()
        
        if (response.ok && result.data) {
          this.siteConfig = {
            company_name: result.data.company_name || this.siteConfig.company_name,
            site_title: result.data.site_title || this.siteConfig.site_title,
            icp_number: result.data.icp_number || this.siteConfig.icp_number,
            police_number: result.data.police_number || this.siteConfig.police_number,
            copyright_info: result.data.copyright_info || this.siteConfig.copyright_info
          }
          
          // 设置页面标题
          document.title = this.siteConfig.site_title
        }
      } catch (error) {
        console.error('获取网站配置失败:', error)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 路由切换动画 */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 缩放过渡效果 */
.scale-enter-active, .scale-leave-active {
  transition: all 0.4s ease;
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* 滑动过渡效果 */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>