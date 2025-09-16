import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import ProductDetail from '../views/ProductDetail.vue'
import News from '../views/News.vue'
import NewsDetail from '../views/NewsDetail.vue'
import Contact from '../views/Contact.vue'

// 管理后台页面
import AdminLogin from '../views/AdminLogin.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import AdminProducts from '../views/AdminProducts.vue'
import AdminNews from '../views/AdminNews.vue'
import AdminMessages from '../views/AdminMessages.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  // 管理后台路由
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard
  },
  {
    path: '/admin/products',
    name: 'AdminProducts',
    component: AdminProducts
  },
  {
    path: '/admin/news',
    name: 'AdminNews',
    component: AdminNews
  },
  {
    path: '/admin/messages',
    name: 'AdminMessages',
    component: AdminMessages
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router