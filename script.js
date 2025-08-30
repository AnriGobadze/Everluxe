document.addEventListener('DOMContentLoaded', function() {
    
    // --- CACHE DOM ELEMENTS & SETUP ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- MASTER SCROLL CONDUCTOR ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => scrollObserver.observe(el));
    
    // --- DIGITAL TURNTABLE LOGIC ---
    (() => {
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        const turntableSlides = gsap.utils.toArray('.slide');
        if (!carouselWrapper || turntableSlides.length === 0) return;
        const radius = 350;
        turntableSlides.forEach((slide, i) => {
            const angle = i * (360 / turntableSlides.length);
            slide.dataset.rotation = angle;
            gsap.set(slide, { rotationY: angle, transformOrigin: `50% 50% ${-radius}px`, x: -slide.offsetWidth/2, y: -slide.offsetHeight/2 });
        });
        let rotationProxy = { value: 0 };
        const autoRotate = gsap.to(rotationProxy, {
            value: 360, duration: 30, ease: "none", repeat: -1,
            onUpdate: () => {
                turntableSlides.forEach(slide => {
                    const currentAngle = parseFloat(slide.dataset.rotation) + rotationProxy.value;
                    const relativeRotation = Math.abs(currentAngle % 360);
                    const normalized = Math.min(relativeRotation, 360 - relativeRotation) / 180;
                    const brightness = 1 - normalized * 0.5;
                    const opacity = 1 - normalized * 0.4;
                    const scale = 1 - normalized * 0.25;
                    gsap.set(slide, { rotationY: currentAngle, filter: `brightness(${brightness})`, opacity: opacity, scale: scale, zIndex: Math.round(100 * (1 - normalized)) });
                });
            }
        });
        carouselWrapper.addEventListener('mouseenter', () => gsap.to(autoRotate, { timeScale: 0, duration: 0.5 }));
        carouselWrapper.addEventListener('mouseleave', () => gsap.to(autoRotate, { timeScale: 1, duration: 0.5 }));
    })();

    // --- CRYSTALLINE CARD PARALLAX LOGIC (WITH MOBILE FIX) ---
    (() => {
        const watchCards = document.querySelectorAll('.watch-card');
        if (watchCards.length === 0) return;
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const cardObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });
            watchCards.forEach(card => cardObserver.observe(card));
        } else {
            watchCards.forEach(card => {
                const watchImage = card.querySelector('.watch-image-container img');
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                    gsap.to(card, { rotationY: x * 15, rotationX: y * -15, duration: 0.8, ease: 'power2.out' });
                    gsap.to(watchImage, { x: x * -20, y: y * -20, duration: 1, ease: 'power2.out' });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { rotationY: 0, rotationX: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
                    gsap.to(watchImage, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.5)' });
                });
            });
        }
    })();
    
    // --- UNIFIED NAVIGATION & LANGUAGE LOGIC ---
    let translations; 
    (() => {
        translations = {
            en: { nav_masterpiece: 'The Masterpiece', nav_collection: 'The Collection', nav_atelier: 'Contact', cta_viewing: 'Contact Us', cta_viewing_mobile: 'Contact Us', hero_title: 'An Exhibition of Artistry', hero_subtitle: 'An interactive gallery of horological artistry.', loupe_title: 'Under the Loupe', loupe_hotspot1_title: 'Tachymeter Bezel', loupe_hotspot1_text: 'Crafted from a single ceramic block, the bezel is scratch-proof and makes measuring speed simple and clear.', loupe_hotspot2_title: 'Sapphire Crystal', loupe_hotspot2_text: 'A virtually scratchproof sapphire crystal, with an anti-reflective coating, ensures perfect legibility under any lighting condition.', loupe_hotspot3_title: 'Sunburst Dial', loupe_hotspot3_text: 'The deep black sunburst dial catches and reflects light, creating a dynamic display that shifts with every movement of the wrist.', collection_title: 'OurCollection', price_from: 'From', form_title: 'Explore our collection', form_text: '"Curious about our watches? Follow us on social media or contact us directly for updates and details.', form_name_label: 'Full Name', form_email_label: 'Email Address', form_watch_label: 'Watch of Interest (Optional)', form_button: 'Send ', form_button_sent: 'Sent!' },
            ge: { nav_masterpiece: 'შედევრი', nav_collection: 'კოლექცია', nav_atelier: 'კონტაქტი', cta_viewing: 'დაგვიკავშირდით', cta_viewing_mobile: 'დაგვიკავშირდით', hero_title: 'ხელოვნების გამოფენა', hero_subtitle: 'საათების ხელოვნების ინტერაქტიული გალერეა.', loupe_title: 'გამადიდებელი შუშის ქვეშ', loupe_hotspot1_title: 'ტაქომეტრის ჩარჩო', loupe_hotspot1_text: 'ერთი კერამიკული ბლოკიდან შექმნილი ბეზელი დაცულია ცვეთისგან და დროის გაზომვა მარტივი და ხილვადია.', loupe_hotspot2_title: 'საფირის კრისტალი', loupe_hotspot2_text: 'პრაქტიკულად ნაკაწრგაუმტარი საფირის კრისტალი ანტირეფლექსური საფარით უზრუნველყოფს სრულყოფილ წაკითხვადობას ნებისმიერ განათებაში.', loupe_hotspot3_title: 'მზის სხივის ციფერბლატი', loupe_hotspot3_text: 'ღრმა შავი მზის სხივის ციფერბლატი ირეკლავს სინათლეს, ქმნის დინამიურ ჩვენებას, რომელიც იცვლება მაჯის ყოველი მოძრაობისას.', collection_title: 'ჩვენი კოლექცია', price_from: 'დან', form_title: 'გაეცანით ჩვენს კოლექციას', form_text: 'დაინტერესებული ხართ ჩვენი საათებით? დაგვაფოლოვეთ სოციალურ ქსელში ან დაგვიკავშირდით დეტალებისა და განახლებების გასაგებად.', form_name_label: 'სრული სახელი', form_email_label: 'ელ. ფოსტა', form_watch_label: 'სასურველი საათი (სურვილისამებრ)', form_button: 'გაგზავნა', form_button_sent: 'გაგზავნილია!' },
            ru: { nav_masterpiece: 'Шедевр', nav_collection: 'Коллекция', nav_atelier: 'Контакт', cta_viewing: 'Связаться с нами', cta_viewing_mobile: 'Связаться с нами', hero_title: 'Выставка мастерства', hero_subtitle: 'Интерактивная галерея часового искусства.', loupe_title: 'Под лупой', loupe_hotspot1_title: 'Безель с тахиметром', loupe_hotspot1_text: 'Безель, созданный из одного керамического блока, защищён от износа, а измерять время легко и удобно.', loupe_hotspot2_title: 'Сапфировое стекло', loupe_hotspot2_text: 'Практически нецарапающееся сапфировое стекло с антибликовым покрытием обеспечивает идеальную читаемость при любом освещении.', loupe_hotspot3_title: 'Циферблат "Солнечные лучи"', loupe_hotspot3_text: 'Глубокий черный циферблат с узором "солнечные лучи" ловит и отражает свет, создавая динамичное отображение, которое меняется с каждым движением запястья.', collection_title: 'Наша коллекция', price_from: 'От', form_title: 'Ознакомьтесь с нашей коллекцией', form_text: 'Интересуетесь нашими часами? Подписывайтесь на нас в соцсетях или свяжитесь с нами напрямую, чтобы узнать подробности и новости.', form_name_label: 'Полное имя', form_email_label: 'Адрес электронной почты', form_watch_label: 'Интересующие часы (необязательно)', form_button: 'Отправлять ', form_button_sent: 'Отправлено!' }
        };
        
        const burger = document.querySelector('.burger');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileNavCta = document.querySelector('.mobile-cta');
        const desktopSwitcher = document.querySelector('.lang-switcher');
        const desktopActiveDisplay = document.querySelector('.lang-switcher-active');
        const desktopOptions = document.querySelectorAll('.lang-option');
        const mobileDial = document.querySelector('.mobile-dial');
        const mobileDialOptions = document.querySelectorAll('.mobile-dial-option');
        const dialRotations = { en: 0, ge: -120, ru: -240 };
        
        const setLanguage = (lang) => {
            if (!translations[lang]) return; 
            document.querySelectorAll('[data-key]').forEach(elem => {
                const key = elem.dataset.key;
                if (translations[lang][key] !== undefined) {
                    elem.textContent = translations[lang][key];
                }
            });
            if (desktopActiveDisplay) desktopActiveDisplay.textContent = lang.toUpperCase();
            desktopOptions.forEach(opt => {
                opt.classList.toggle('is-active', opt.dataset.lang === lang);
            });
            if (desktopSwitcher) desktopSwitcher.classList.remove('is-open');
            if (mobileDial) {
                const targetRotation = dialRotations[lang];
                gsap.to(mobileDial, { rotation: targetRotation + "_short", duration: 0.7, ease: 'elastic.out(1, 0.75)' });
                gsap.to(mobileDialOptions, { rotation: -targetRotation + "_short", duration: 0.7, ease: 'elastic.out(1, 0.75)' });
                mobileDialOptions.forEach(opt => {
                    opt.style.color = opt.dataset.lang === lang ? 'var(--color-primary)' : 'var(--color-text-muted)';
                });
            }
            localStorage.setItem('userLanguage', lang);
            document.documentElement.lang = lang;
        };
        if (burger && mobileNav) {
            burger.addEventListener('click', () => {
                burger.classList.toggle('is-active');
                mobileNav.classList.toggle('is-open');
            });
            mobileNavCta.addEventListener('click', () => {
                burger.classList.remove('is-active');
                mobileNav.classList.remove('is-open');
            });
        }
        if (desktopSwitcher && desktopActiveDisplay) {
            desktopActiveDisplay.addEventListener('click', (e) => {
                e.stopPropagation();
                desktopSwitcher.classList.toggle('is-open');
            });
        }
        desktopOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(opt.dataset.lang);
            });
        });
        mobileDialOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(opt.dataset.lang);
            });
        });
        document.addEventListener('click', () => {
             if (desktopSwitcher) desktopSwitcher.classList.remove('is-open');
        });
        const userLang = localStorage.getItem('userLanguage') || navigator.language.split('-')[0];
        const initialLang = translations[userLang] ? userLang : 'en';
        setLanguage(initialLang);
    })();
    
    // --- UNDER THE LOUPE LOGIC ---
    (() => {
        const featuredExplorer = document.querySelector('.featured-watch-explorer');
        if (!featuredExplorer) return;
        const triggers = featuredExplorer.querySelectorAll('.hotspot-trigger');
        const mainWatchImage = featuredExplorer.querySelector('.main-watch-image');
        const loupe = featuredExplorer.querySelector('.digital-loupe');
        const isMobile = window.innerWidth <= 768;
        if (mainWatchImage && loupe) loupe.style.backgroundImage = `url(${mainWatchImage.src})`;
        triggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                if (trigger.classList.contains('is-active')) return;
                triggers.forEach(t => t.classList.remove('is-active'));
                trigger.classList.add('is-active');
                mainWatchImage.classList.add('is-dimmed');
                const targetX = trigger.dataset.x;
                const targetY = trigger.dataset.y;
                gsap.to(loupe, { 
                    left: targetX, top: targetY, xPercent: -50, yPercent: -50,
                    opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', 
                    backgroundPosition: `${targetX} ${targetY}` 
                });
            });
        });
        const loupeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loupeObserver.unobserve(featuredExplorer);
                    if (isMobile) {
                        const tl = gsap.timeline();
                        const firstTrigger = triggers[0];
                        if (!firstTrigger) return;
                        const targetX = firstTrigger.dataset.x;
                        const targetY = firstTrigger.dataset.y;
                        tl.to(firstTrigger, { backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary)', duration: 0.5 });
                        tl.add(() => mainWatchImage.classList.add('is-dimmed'), "<");
                        tl.to(loupe, { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', left: targetX, top: targetY, xPercent: -50, yPercent: -50, backgroundPosition: `${targetX} ${targetY}` }, "<");
                        tl.to({}, { duration: 1.5 });
                        tl.to(firstTrigger, { backgroundColor: 'transparent', borderColor: 'var(--color-border)', duration: 0.5 });
                        tl.add(() => mainWatchImage.classList.remove('is-dimmed'), "<");
                        tl.to(loupe, { opacity: 0, scale: 0.5, duration: 0.8, ease: 'power3.inOut' }, "<");
                        tl.set(firstTrigger, { clearProps: "backgroundColor,borderColor" });
                    } else {
                        gsap.fromTo(triggers, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' });
                    }
                }
            });
        }, { threshold: 0.5 });
        loupeObserver.observe(featuredExplorer);
    })();
    
    // --- APPOINTMENT FORM LOGIC ---
    (() => {
        const form = document.querySelector('.atelier-form');
        if (!form) return;
        
        const button = form.querySelector('button[type="submit"]');
        const buttonIcon = form.querySelector('.button-icon');
        const buttonText = form.querySelector('.button-text');
        const statusMessage = form.querySelector('.form-status');

        async function handleSubmit(event) {
            event.preventDefault();
            
            const originalButtonText = buttonText.textContent;
            const currentLang = localStorage.getItem('userLanguage') || 'en';

            button.disabled = true;
            buttonIcon.classList.add('spinning');
            statusMessage.style.display = 'none';

            const data = new FormData(event.target);
            try {
                const response = await fetch(event.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    buttonIcon.classList.remove('spinning');
                    buttonIcon.innerHTML = '<i class="fas fa-check"></i>';
                    if (translations[currentLang] && translations[currentLang].form_button_sent) {
                        buttonText.textContent = translations[currentLang].form_button_sent;
                    } else {
                        buttonText.textContent = "Sent!";
                    }
                    
                    statusMessage.textContent = "Thank you! Your request has been sent.";
                    statusMessage.className = 'form-status success';
                    form.reset();

                    setTimeout(() => {
                        button.disabled = false;
                        buttonIcon.innerHTML = '<i class="fas fa-cog"></i>'; 
                        buttonText.textContent = originalButtonText;
                        statusMessage.className = 'form-status';
                        statusMessage.style.display = 'none';
                    }, 3000); 

                } else {
                    throw new Error('Network response was not ok.');
                }
            } catch (error) {
                button.disabled = false;
                buttonIcon.classList.remove('spinning');
                statusMessage.textContent = "Oops! There was a problem submitting your form.";
                statusMessage.className = 'form-status error';
            }
        }
        form.addEventListener("submit", handleSubmit);
    })();

});