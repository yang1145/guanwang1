<template>
  <div class="admin-products">
    <header class="admin-header">
      <div class="header-content">
        <h1>产品管理</h1>
        <button @click="showCreateForm" class="add-btn">
          <PlusIcon :size="18" />
          添加产品
        </button>
      </div>
    </header>
    
    <div class="admin-content">
      <nav class="sidebar">
        <ul>
          <li>
            <router-link to="/admin/dashboard" active-class="active">
              <HomeIcon :size="18" />
              仪表盘
            </router-link>
          </li>
          <li>
            <router-link to="/admin/products" active-class="active">
              <PackageIcon :size="18" />
              产品管理
            </router-link>
          </li>
          <li>
            <router-link to="/admin/news" active-class="active">
              <FileTextIcon :size="18" />
              新闻管理
            </router-link>
          </li>
          <li>
            <router-link to="/admin/messages" active-class="active">
              <MailIcon :size="18" />
              消息管理
            </router-link>
          </li>
        </ul>
      </nav>
      
      <main class="main-content">
        <div class="section-header">
          <h2>产品列表</h2>
        </div>
        
        <div class="products-grid">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-card"
          >
            <div class="product-image">
              <div class="placeholder-image">{{ product.name.charAt(0) }}</div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="product-category">{{ product.category }}</p>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-actions">
                <button @click="editProduct(product)" class="edit-btn">
                  <EditIcon :size="16" />
                  编辑
                </button>
                <button @click="deleteProduct(product.id)" class="delete-btn">
                  <TrashIcon :size="16" />
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- 添加/编辑产品模态框 -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>{{ editingProduct ? '编辑产品' : '添加产品' }}</h2>
        <form @submit.prevent="saveProduct">
          <div class="form-group">
            <label for="name">产品名称</label>
            <input 
              type="text" 
              id="name" 
              v-model="productForm.name" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="category">产品分类</label>
            <input 
              type="text" 
              id="category" 
              v-model="productForm.category" 
              required
            />
          </div>
          
          <div class="form-group">
            <label for="description">产品描述</label>
            <textarea 
              id="description" 
              v-model="productForm.description" 
              rows="4"
              required
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="image_url">图片链接</label>
            <input 
              type="text" 
              id="image_url" 
              v-model="productForm.image_url"
            />
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeModal" class="cancel-btn">
              取消
            </button>
            <button type="submit" class="save-btn">
              {{ editingProduct ? '更新' : '添加' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="closeDeleteConfirm">
      <div class="modal-content" @click.stop>
        <h2>确认删除</h2>
        <p>确定要删除产品 "{{ productToDelete?.name }}" 吗？此操作不可撤销。</p>
        <div class="form-actions">
          <button type="button" @click="closeDeleteConfirm" class="cancel-btn">
            取消
          </button>
          <button type="button" @click="confirmDelete" class="delete-confirm-btn">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  PlusIcon, 
  EditIcon, 
  TrashIcon,
  HomeIcon,
  PackageIcon,
  FileTextIcon,
  MailIcon
} from 'lucide-vue-next'
import API_BASE_URL from '@/api.js'

export default {
  name: 'AdminProducts',
  components: {
    PlusIcon,
    EditIcon,
    TrashIcon,
    HomeIcon,
    PackageIcon,
    FileTextIcon,
    MailIcon
  },
  data() {
    return {
      products: [],
      showModal: false,
      showDeleteConfirm: false,
      editingProduct: null,
      productToDelete: null,
      productForm: {
        name: '',
        category: '',
        description: '',
        image_url: ''
      }
    }
  },
  async mounted() {
    if (!this.checkAuth()) {
      return
    }
    
    await this.fetchProducts()
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        this.$router.push('/admin/login')
        return false
      }
      return true
    },
    
    async fetchProducts() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products`)
        const result = await response.json()
        
        if (response.ok) {
          this.products = result.data
        } else {
          console.error('获取产品失败:', result.error)
        }
      } catch (error) {
        console.error('获取产品时出错:', error)
      }
    },
    
    showCreateForm() {
      this.editingProduct = null
      this.productForm = {
        name: '',
        category: '',
        description: '',
        image_url: ''
      }
      this.showModal = true
    },
    
    editProduct(product) {
      this.editingProduct = product
      this.productForm = { ...product }
      this.showModal = true
    },
    
    closeModal() {
      this.showModal = false
      this.editingProduct = null
    },
    
    async saveProduct() {
      try {
        const url = this.editingProduct 
          ? `${API_BASE_URL}/api/products/${this.editingProduct.id}` 
          : `${API_BASE_URL}/api/products`
          
        const method = this.editingProduct ? 'PUT' : 'POST'
        
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.productForm)
        })
        
        const result = await response.json()
        
        if (response.ok) {
          this.closeModal()
          await this.fetchProducts()
        } else {
          alert(result.error || '操作失败')
        }
      } catch (error) {
        console.error('保存产品时出错:', error)
        alert('网络错误，请稍后重试')
      }
    },
    
    deleteProduct(id) {
      const product = this.products.find(p => p.id === id)
      this.productToDelete = product
      this.showDeleteConfirm = true
    },
    
    closeDeleteConfirm() {
      this.showDeleteConfirm = false
      this.productToDelete = null
    },
    
    async confirmDelete() {
      if (!this.productToDelete) return
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/${this.productToDelete.id}`, {
          method: 'DELETE'
        })
        
        const result = await response.json()
        
        if (response.ok) {
          this.closeDeleteConfirm()
          await this.fetchProducts()
        } else {
          alert(result.error || '删除失败')
        }
      } catch (error) {
        console.error('删除产品时出错:', error)
        alert('网络错误，请稍后重试')
      }
    }
  }
}
</script>

<style scoped>
.admin-products {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
}

.admin-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
}

.header-content h1 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background: #359c6d;
}

.admin-content {
  display: flex;
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.sidebar {
  width: 250px;
  background: #f8f9fa;
  padding: 20px 0;
  border-right: 1px solid #eee;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 5px;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  text-decoration: none;
  color: #555;
  transition: all 0.3s;
}

.sidebar a:hover,
.sidebar a.active {
  background: #42b983;
  color: white;
}

.main-content {
  flex: 1;
  padding: 30px;
}

.section-header h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.3rem;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b983;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 150px;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  font-size: 3rem;
  color: #999;
  font-weight: bold;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.product-category {
  display: inline-block;
  padding: 4px 10px;
  background: #42b983;
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.product-description {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.product-actions {
  display: flex;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.edit-btn {
  background: #ffc107;
  color: #212529;
}

.edit-btn:hover {
  background: #e0a800;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #d32f2f;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin: 0 0 20px 0;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #42b983;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn,
.delete-confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.cancel-btn {
  background: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background: #e9ecef;
}

.save-btn,
.delete-confirm-btn {
  background: #42b983;
  color: white;
}

.save-btn:hover,
.delete-confirm-btn:hover {
  background: #359c6d;
}

.delete-confirm-btn {
  background: #f44336;
}

.delete-confirm-btn:hover {
  background: #d32f2f;
}
</style>