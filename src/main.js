document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 80
    });

    // 2. Мобильное меню (Бургер)
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    if (burger) {
        burger.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) toggleMenu();
        });
    });

    // 3. Хедер и Cookie Popup при загрузке
    const header = document.querySelector('.header');
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieBtn = document.getElementById('cookie-accept');

    // Проверка Cookie в localStorage
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('show');
        }, 2000);
    }

    cookieBtn.addEventListener('click', () => {
        localStorage.setItem('cookies-accepted', 'true');
        cookiePopup.classList.remove('show');
    });

    window.addEventListener('scroll', () => {
        window.scrollY > 50 ? header.classList.add('scrolled') : header.classList.remove('scrolled');
    });

    // 4. Параллакс для Hero картинки
    const heroImg = document.querySelector('.hero__img-main');
    if (heroImg && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            heroImg.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    // 5. Контактная форма и Капча
    const form = document.getElementById('main-form');
    if (form) {
        const captchaText = document.getElementById('captcha-question');
        let n1 = Math.floor(Math.random() * 10), n2 = Math.floor(Math.random() * 10);
        let correct = n1 + n2;
        if (captchaText) captchaText.textContent = `${n1} + ${n2}`;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const ans = parseInt(document.getElementById('captcha-answer').value);
            const msg = document.getElementById('form-message');
            
            if (ans !== correct) {
                msg.textContent = "Ошибка в капче!";
                msg.className = "form-response error";
                return;
            }

            msg.textContent = "Отправка...";
            msg.className = "form-response success";
            msg.style.display = "block";

            await new Promise(r => setTimeout(r, 1500));
            msg.textContent = "Успешно отправлено!";
            form.reset();
        });
    }

    // 6. Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});