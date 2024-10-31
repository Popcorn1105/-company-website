// 导航栏响应式切换
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 汉堡菜单点击事件
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // 移除其他链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前链接的active类
            this.classList.add('active');
        });
    });

    // 滚动监听
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY;

        // 导航栏背景透明度控制
        if (scrollPosition > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }

        // 滚动位置监听，更新导航active状态
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// 表单验证和提交
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // 获取表单数据
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 表单验证
        if (data.name.length < 2) {
            e.preventDefault();
            alert('请输入有效的姓名');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            e.preventDefault();
            alert('请输入有效的邮箱地址');
            return;
        }
        
        if (data.phone && !isValidPhone(data.phone)) {
            e.preventDefault();
            alert('请输入有效的电话号码');
            return;
        }
        
        if (data.message.length < 10) {
            e.preventDefault();
            alert('留言内容至少需要10个字符');
            return;
        }
    });
}

// 邮箱验证函数
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 电话号码验证函数
function isValidPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
