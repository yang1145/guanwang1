<template>
  <div class="about">
    <section class="page-header" :style="{ 'background-image': 'url(' + headerImage + ')' }">
      <div class="container">
        <h1 data-aos="fade-down">关于我们</h1>
        <p data-aos="fade-up" data-aos-delay="200">了解我们的故事、使命和愿景</p>
      </div>
    </section>

    <section class="company-info">
      <div class="container">
        <div class="info-content">
          <div class="info-text" data-aos="fade-right">
            <h2>公司简介</h2>
            <p>科技企业成立于2010年，是一家专注于前沿技术研发和创新解决方案提供的科技公司。我们致力于通过技术创新推动行业发展，为客户提供卓越的产品和服务。</p>
            <p>经过多年的发展，我们已经成为行业内的领先企业，拥有强大的研发团队和完善的售后服务体系。</p>
          </div>
          <div class="info-image" data-aos="fade-left">
            <div class="placeholder-image">公司图片</div>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-vision">
      <div class="container">
        <div class="mission-vision-grid">
          <div class="mission-vision-card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-icon"><TargetIcon :size="48" /></div>
            <h3>我们的使命</h3>
            <p>通过持续的技术创新和优质服务，为客户创造价值，推动社会进步。</p>
            <ul class="mission-vision-list">
              <li>为客户提供卓越的技术解决方案</li>
              <li>推动行业技术发展与创新</li>
              <li>促进社会数字化转型</li>
            </ul>
          </div>
          <div class="mission-vision-card" data-aos="fade-up" data-aos-delay="200">
            <div class="card-icon"><RocketIcon :size="48" /></div>
            <h3>我们的愿景</h3>
            <p>成为全球领先的科技企业，引领行业发展，创造更美好的未来。</p>
            <ul class="mission-vision-list">
              <li>成为行业技术创新的引领者</li>
              <li>建立全球化服务网络</li>
              <li>打造可持续发展的企业生态</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="team">
      <div class="container">
        <h2 data-aos="fade-up">核心团队</h2>
        <div class="team-description" data-aos="fade-up" data-aos-delay="100">
          <p>我们拥有一支由行业专家和资深工程师组成的多元化团队，致力于技术创新和卓越服务。</p>
        </div>
        <div class="team-grid">
          <div class="team-member" data-aos="fade-up" data-aos-delay="100">
            <div class="member-avatar">
              <div class="placeholder-avatar">CEO</div>
            </div>
            <div class="member-info">
              <h3>张三</h3>
              <p class="member-title">首席执行官</p>
              <p class="member-bio">拥有15年科技行业经验，曾就职于多家知名科技公司。</p>
            </div>
          </div>
          <div class="team-member" data-aos="fade-up" data-aos-delay="200">
            <div class="member-avatar">
              <div class="placeholder-avatar">CTO</div>
            </div>
            <div class="member-info">
              <h3>李四</h3>
              <p class="member-title">首席技术官</p>
              <p class="member-bio">技术专家，专注于人工智能和大数据领域研究。</p>
            </div>
          </div>
          <div class="team-member" data-aos="fade-up" data-aos-delay="300">
            <div class="member-avatar">
              <div class="placeholder-avatar">CMO</div>
            </div>
            <div class="member-info">
              <h3>王五</h3>
              <p class="member-title">市场总监</p>
              <p class="member-bio">市场营销专家，擅长品牌建设和市场推广。</p>
            </div>
          </div>
          <div class="team-member" data-aos="fade-up" data-aos-delay="400">
            <div class="member-avatar">
              <div class="placeholder-avatar">COO</div>
            </div>
            <div class="member-info">
              <h3>赵六</h3>
              <p class="member-title">首席运营官</p>
              <p class="member-bio">运营管理专家，专注于提升企业运营效率和客户满意度。</p>
            </div>
          </div>
          <div class="team-member" data-aos="fade-up" data-aos-delay="500">
            <div class="member-avatar">
              <div class="placeholder-avatar">CDO</div>
            </div>
            <div class="member-info">
              <h3>钱七</h3>
              <p class="member-title">设计总监</p>
              <p class="member-bio">用户体验设计专家，致力于创造美观且实用的产品界面。</p>
            </div>
          </div>
          <div class="team-member" data-aos="fade-up" data-aos-delay="600">
            <div class="member-avatar">
              <div class="placeholder-avatar">CFO</div>
            </div>
            <div class="member-info">
              <h3>孙八</h3>
              <p class="member-title">财务总监</p>
              <p class="member-bio">财务管理专家，拥有丰富的投融资和资本运作经验。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import bg2 from '../assets/images/bg2.jpg'
// 导入lucide-vue-next图标
import { TargetIcon, RocketIcon } from 'lucide-vue-next'

export default {
  name: 'About',
  components: {
    TargetIcon,
    RocketIcon
  },
  data() {
    return {
      headerImage: bg2
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
            setTimeout(() => {
              element.classList.add('aos-animate');
            }, parseInt(element.dataset.aosDelay, 10) || 0);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach(element => observer.observe(element));
    }
  }
}
</script>

<style scoped>
.about {
  flex: 1;
}

.page-header {
  background: no-repeat center center;
  background-size: cover;
  color: white;
  padding: 100px 0;
  text-align: center;
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

.company-info {
  padding: 80px 0;
}

.info-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 50px;
  align-items: center;
  margin: 50px 0;
}

.info-text {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease;
}

.info-text.aos-animate {
  opacity: 1;
  transform: translateX(0);
}

.info-text h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

.dark-mode .info-text h2 {
  color: #e0e0e0;
}

.info-text p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.dark-mode .info-text p {
  color: #aaa;
}

.placeholder-image {
  background-color: #e9ecef;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #6c757d;
  border-radius: 10px;
}

.dark-mode .placeholder-image {
  background-color: #3d3d3d;
  color: #aaa;
}

.mission-vision {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.dark-mode .mission-vision {
  background-color: #252525;
}

.mission-vision-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 50px 0;
}

.mission-vision-card {
  padding: 30px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.4s ease;
  border: 1px solid #eee;
}

.dark-mode .mission-vision-card {
  background: #2d2d2d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #3d3d3d;
}

.mission-vision-card.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.mission-vision-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.dark-mode .mission-vision-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.mission-vision-card h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.mission-vision-card h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: #42b983;
}

.dark-mode .mission-vision-card h3 {
  color: #e0e0e0;
}

.mission-vision-card p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
}

.dark-mode .mission-vision-card p {
  color: #aaa;
}

.mission-vision-list {
  list-style: none;
  padding-left: 0;
}

.mission-vision-list li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 12px;
  color: #666;
  line-height: 1.6;
}

.dark-mode .mission-vision-list li {
  color: #aaa;
}

.mission-vision-list li:before {
  content: "";
  position: absolute;
  left: 0;
  top: 8px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #42b983;
}

.team {
  padding: 80px 0;
}

.team-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 40px;
  color: #666;
  line-height: 1.8;
}

.dark-mode .team-description {
  color: #aaa;
}

.team h2 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
  color: #333;
}

.dark-mode .team h2 {
  color: #e0e0e0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin: 50px 0;
}

.team-member {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.team-member.aos-animate {
  opacity: 1;
  transform: translateY(0);
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.dark-mode .team-member {
  background: #2d2d2d;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dark-mode .team-member:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
}

.member-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid #42b983;
}

.placeholder-avatar {
  background-color: #e9ecef;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #6c757d;
  font-weight: bold;
}

.dark-mode .placeholder-avatar {
  background-color: #3d3d3d;
  color: #aaa;
}

.member-info h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #333;
}

.dark-mode .member-info h3 {
  color: #e0e0e0;
}

.member-title {
  color: #42b983;
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.dark-mode .member-title {
  color: #64b5f6;
}

.member-bio {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0;
  min-height: 60px;
}

.dark-mode .member-bio {
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

  .company-info {
    padding: 60px 0;
  }

  .info-content {
    flex-direction: column;
  }

  .mission-vision {
    padding: 60px 0;
  }

  .team {
    padding: 60px 0;
  }

  .team h2 {
    font-size: 1.7rem;
  }
  
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .member-avatar {
    width: 100px;
    height: 100px;
  }
}
</style>