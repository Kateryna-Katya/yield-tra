document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация AOS (анимация появления блоков при скролле)
    AOS.init({
        duration: 1000,
        easing: 'ease-out-quad',
        once: true,
        offset: 100
    });

    // 2. Хедер: эффект при скролле
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Плавная навигация по якорным ссылкам
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Параллакс эффект для главной картинки Hero
    const heroImg = document.querySelector('.hero__img-main');
    if (heroImg) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (window.innerWidth / 2 - e.pageX) / 45;
            const moveY = (window.innerHeight / 2 - e.pageY) / 45;
            heroImg.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });
    }

    // 5. Мобильное меню (Бургер)
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Если нужно отображение меню (простая реализация)
            if (nav.classList.contains('active')) {
                nav.style.display = 'block';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = 'var(--primary-bg)';
                nav.style.padding = '20px';
            } else {
                nav.style.display = '';
            }
        });
    }
});