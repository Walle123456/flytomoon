class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.typed-text');
    const words = ['前端开发工程师', '热爱编程', '追求创新']; // 这里可以自定义打字内容
    const wait = 3000;
    new TypeWriter(txtElement, words, wait);
}

// 添加滚动监听功能
function handleScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) { // 60px 是导航栏的高度
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// 添加滚动事件监听
window.addEventListener('scroll', handleScroll);

// 页面加载时也执行一次
document.addEventListener('DOMContentLoaded', () => {
    init(); // 原有的初始化函数
    handleScroll(); // 新增的滚动监听初始化
});

// 工作经历切换
function initExperience() {
    const navItems = document.querySelectorAll('.exp-nav .nav-item');
    const expItems = document.querySelectorAll('.exp-item');

    function switchExp(index) {
        navItems.forEach(item => item.classList.remove('active'));
        expItems.forEach(item => item.classList.remove('active'));
        
        navItems[index].classList.add('active');
        expItems[index].classList.add('active');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => switchExp(index));
    });
}

document.addEventListener('DOMContentLoaded', initExperience);

// 项目展示切换
function initProjects() {
    const navItems = document.querySelectorAll('.projects-nav .nav-item');
    const sections = document.querySelectorAll('.project-section');

    function switchSection(index) {
        navItems.forEach(item => item.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        navItems[index].classList.add('active');
        sections[index].classList.add('active');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => switchSection(index));
    });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initProjects();
});

// 工作项目切换
function initWorkProjects() {
    const navItems = document.querySelectorAll('.project-nav .nav-item');
    const projectItems = document.querySelectorAll('.project-item');

    function switchProject(index) {
        navItems.forEach(item => item.classList.remove('active'));
        projectItems.forEach(item => item.classList.remove('active'));
        
        navItems[index].classList.add('active');
        projectItems[index].classList.add('active');
    }

    navItems.forEach((item, index) => {
        item.addEventListener('click', () => switchProject(index));
    });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initWorkProjects();
});

// 轮播图控制
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let isAnimating = false;

    function showSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        const direction = index > currentSlide ? 1 : -1;
        const currentElement = slides[currentSlide];
        currentSlide = (index + slides.length) % slides.length;
        const nextElement = slides[currentSlide];

        // 设置初始位置
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active', 'prev');
        });

        currentElement.style.display = 'block';
        nextElement.style.display = 'block';

        // 设置滑动方向
        if (direction > 0) {
            nextElement.style.transform = 'translateX(100%)';
            currentElement.style.transform = 'translateX(0)';
        } else {
            nextElement.style.transform = 'translateX(-100%)';
            currentElement.style.transform = 'translateX(0)';
        }

        // 触发重排以确保动画生效
        void nextElement.offsetWidth;

        // 执行动画
        currentElement.style.transform = `translateX(${-100 * direction}%)`;
        currentElement.style.opacity = '0';
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';

        // 动画结束后清理
        setTimeout(() => {
            slides.forEach(slide => {
                if (slide !== nextElement) {
                    slide.style.display = 'none';
                }
            });
            nextElement.classList.add('active');
            isAnimating = false;
        }, 1200); // 调整为与 CSS transition 相同的时长
    }

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    // 添加键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

// 项目作品区域滑动切换
function initProjectsSwipe() {
    const projectsContent = document.querySelector('.projects-content');
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let currentSection = 'work';
    const pageWidth = window.innerWidth;
    let accumulatedDelta = 0;
    let isAnimating = false;
    const MOVEMENT_THRESHOLD = 5;
    let initialScrollY = 0;  // 记录初始滚动位置
    let initialDirection = null;  // 'horizontal' 或 'vertical' 或 null

    // 触摸板事件处理
    projectsContent.addEventListener('wheel', (e) => {
        if (isAnimating) return;

        // 降低横向判定门槛，提高响应速度
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2) {  // 从1.5降到1.2
            e.preventDefault();
            accumulatedDelta += e.deltaX * 1.5;  // 增加滑动系数
            
            if (Math.abs(accumulatedDelta) > MOVEMENT_THRESHOLD) {
                const moveX = -accumulatedDelta * 2;  // 增加移动速度
                requestAnimationFrame(() => {
                    projectsContent.style.transform = `translateX(${moveX}px)`;
                });
            }

            clearTimeout(projectsContent.wheelTimeout);
            
            projectsContent.wheelTimeout = setTimeout(() => {
                if (Math.abs(accumulatedDelta) > 35) {  // 降低切换阈值
                    if (!isAnimating) {
                        isAnimating = true;
                        
                        requestAnimationFrame(() => {
                            projectsContent.style.transition = 'transform 0.2s ease-out';  // 减少过渡时间
                            
                            if (accumulatedDelta > 0 && currentSection === 'work') {
                                switchToPersonalProjects();
                                currentSection = 'personal';
                            } else if (accumulatedDelta < 0 && currentSection === 'personal') {
                                switchToWorkProjects();
                                currentSection = 'work';
                            }

                            projectsContent.style.transform = 'translateX(0)';
                        });
                        
                        setTimeout(() => {
                            projectsContent.style.transition = '';
                            accumulatedDelta = 0;
                            isAnimating = false;
                        }, 200);  // 减少重置时间
                    }
                } else {
                    projectsContent.style.transition = 'transform 0.2s ease-out';
                    projectsContent.style.transform = 'translateX(0)';
                    
                    setTimeout(() => {
                        projectsContent.style.transition = '';
                        accumulatedDelta = 0;
                    }, 200);
                }
            }, 20);  // 减少延迟时间
        }
        // 如果不是横向滚动，完全不干预
    }, { passive: false });

    // 鼠标事件处理
    projectsContent.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialScrollY = window.scrollY;  // 记录初始滚动位置
        projectsContent.style.cursor = 'grabbing';
    });

    projectsContent.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        
        // 判断是否为明显的横向移动
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // 只阻止横向移动的默认行为
            e.preventDefault();
            handleDrag(diffX);
        } else {
            // 垂直移动时，恢复正常滚动
            window.scrollTo(0, initialScrollY - diffY);
        }
    });

    projectsContent.addEventListener('mouseup', handleMouseSwipeEnd);
    projectsContent.addEventListener('mouseleave', handleMouseSwipeEnd);

    // 触摸事件处理
    projectsContent.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].pageY;
        initialDirection = null;  // 重置方向判定
    });

    projectsContent.addEventListener('touchmove', (e) => {
        const diffX = e.touches[0].clientX - startX;
        const diffY = e.touches[0].pageY - startY;

        // 第一次移动时判定方向
        if (initialDirection === null) {
            // 需要有足够的移动距离才判定方向
            if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                initialDirection = Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical';
            }
            return;  // 第一次移动直接返回，不处理
        }

        // 如果是垂直移动，不阻止默认行为
        if (initialDirection === 'vertical') {
            return;
        }

        // 如果是水平移动，阻止默认行为并处理滑动
        if (initialDirection === 'horizontal') {
            e.preventDefault();
            handleDrag(diffX);
        }
    }, { passive: false });

    projectsContent.addEventListener('touchend', (e) => {
        if (initialDirection === 'horizontal') {
            const diffX = e.changedTouches[0].clientX - startX;
            handleSwipeEnd(diffX);
        }
        // 重置状态
        initialDirection = null;
        startX = 0;
        startY = 0;
    });

    projectsContent.addEventListener('touchcancel', () => {
        initialDirection = null;
        startX = 0;
        startY = 0;
        projectsContent.style.transform = '';
    });

    function handleDrag(diff) {
        if (Math.abs(diff) > MOVEMENT_THRESHOLD) {
            requestAnimationFrame(() => {
                const moveX = diff * 0.8;
                const maxMove = pageWidth * 0.4;
                const limitedMoveX = Math.max(Math.min(moveX, maxMove), -maxMove);
                projectsContent.style.transform = `translateX(${limitedMoveX}px)`;
            });
        }
    }

    function handleMouseSwipeEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        projectsContent.style.cursor = 'grab';
        
        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        
        // 只在横向滑动时触发切换
        if (Math.abs(diffX) > Math.abs(diffY)) {
            handleSwipeEnd(diffX);
        }
    }

    function handleSwipeEnd(diff) {
        if (isAnimating) return;
        
        isAnimating = true;
        requestAnimationFrame(() => {
            projectsContent.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            if (Math.abs(diff) > 30) {
                if (diff > 0 && currentSection === 'personal') {
                    switchToWorkProjects();
                    currentSection = 'work';
                } else if (diff < 0 && currentSection === 'work') {
                    switchToPersonalProjects();
                    currentSection = 'personal';
                }
            }

            projectsContent.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            projectsContent.style.transition = '';
            isAnimating = false;
        }, 300);
    }

    function switchToPersonalProjects() {
        document.querySelector('[data-target="personal"]').click();
    }

    function switchToWorkProjects() {
        document.querySelector('[data-target="work"]').click();
    }
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initProjectsSwipe();
});

// 视频播放控制
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('intro-video');
    const playBtn = document.querySelector('.video-play-btn');
    
    playBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            playBtn.classList.add('playing');
        } else {
            video.pause();
            playBtn.classList.remove('playing');
        }
    });

    // 视频结束时重置按钮状态
    video.addEventListener('ended', function() {
        playBtn.classList.remove('playing');
    });
}); 