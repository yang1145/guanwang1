<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <h1>{{ companyName }}</h1>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/" class="nav-link" :class="{ active: $route.name === 'Home' }">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" :class="{ active: $route.name === 'About' }">关于我们</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/products" class="nav-link" :class="{ active: $route.name === 'Products' }">产品中心</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/news" class="nav-link" :class="{ active: $route.name === 'News' }">新闻资讯</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/contact" class="nav-link" :class="{ active: $route.name === 'Contact' }">联系我们</router-link>
          </li>
        </ul>
        <div class="menu-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    companyName: {
      type: String,
      default: '科技企业'
    }
  },
  methods: {
    toggleMenu() {
      const navList = document.querySelector('.nav-list')
      navList.classList.toggle('active')
    }
  }
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo h1 {
  color: #42b983;
  margin: 0;
  font-size: 24px;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-list {
  display: flex;
  list-style: none;
}

.nav-item {
  margin-left: 30px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: #42b983;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #42b983;
  transition: width 0.3s;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 3px 0;
  transition: 0.3s;
}

@media (max-width: 768px) {
  .nav-list {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    transition: 0.3s;
  }

  .nav-list.active {
    left: 0;
  }

  .nav-item {
    margin: 15px 0;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>