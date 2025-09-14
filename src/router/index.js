import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import News from '../views/News.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    meta: {
      transition: 'scale'
    }
  },
  {
    path: '/news',
    name: 'News',
    component: News,
    meta: {
      transition: 'slide'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      transition: 'scale'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router