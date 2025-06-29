document.addEventListener('DOMContentLoaded', function() {
    
    // --- CACHE DOM ELEMENTS ---
    const header = document.querySelector('.site-header');
    const burger = document.querySelector('.burger');
    const navMenu = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const langButtons = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-key]');
    const yearSpan = document.getElementById('year');
    
    const hotspots = document.querySelectorAll('.hotspot');
    const hotspotInfos = document.querySelectorAll('.hotspot-info');
    // Enhanced to select all elements needing animation
    const animatedElements = document.querySelectorAll('[data-animation]');

    // --- DICTIONARY (Unchanged) ---
    const translations = {
        en: {
            logo: "Everlux", nav_ethos: "Our Vision", nav_featured: "Our Watches", nav_collection: "Collection", nav_appointment: "Contact", hero_title: "Heritage and Splendor", hero_subtitle: "Created not to tell time, but to define it.",
ethos_title: "The Spirit of Craftsmanship", ethos_p1: "Everlux was created with one vision: to create watches that are not just watches, but a legacy. Each watch is a world of over a hundred details, a symphony of engineering and art.", ethos_p2: "Our philosophy is patient perfection. We respect the centuries-old tradition of watchmaking and use the materials and techniques of the future.",
featured_title: "Chronograph Sentinel", hotspot1_title: "Tachymeter Bezel", hotspot1_desc: "Made from a single block of ceramic, scratch-resistant and accurate to measure speed.", hotspot2_title: "Sapphire crystal", hotspot2_desc: "The virtually scratch-resistant sapphire crystal with anti-reflective coating ensures perfect visibility.", hotspot3_title: "Sunray dial", hotspot3_desc: "The deep black dial reflects light, creating a dynamic display that changes with every movement.",
collection_title: "Collection", price_from: " - from", appointment_title: "Contact us for details", appointment_subtitle: "Feel the weight, balance and detail of an Everlux watch. Schedule a personal, no-obligation visit.", form_name: "Full name", form_email: "Email", form_watch: "Wanted watch (optional)", form_button: "Submit", footer_tagline: "Time Art.", footer_explore: "Explore", footer_support: "Support", footer_faq: "Frequently Asked Questions", footer_warranty: "Warranty",
       },
        ge: { // Georgian translations...
            logo: "ევერლაქსი", nav_ethos: "ჩვენი ხედვა", nav_featured: "ჩვენი საათები", nav_collection: "კოლექცია", nav_appointment: "კონტაქტი", hero_title: "მემკვიდრეობა და ბრწყინვალება", hero_subtitle: "შექმნილია არა დროის სათქმელად, არამედ მის განსასაზღვრად.",
            ethos_title: "ოსტატობის სული", ethos_p1: "ევერლაქსი შეიქმნა ერთი ხედვით: შევქენით საათები, რომლებიც არ არიან უბრალო საათები, არამედ მემკვიდრეობა. თითოეული საათი ასზე მეტი დეტალისგან შემდგარი სამყაროა, ინჟინერიისა და ხელოვნების სიმფონია.", ethos_p2: "ჩვენი ფილოსოფია მომთმენი სრულყოფილებაა. ჩვენ პატივს ვცემთ საათების დამზადების მრავალსაუკუნოვან ტრადიციას და ვიყენებთ მომავლის მასალებსა და ტექნიკას.",
            featured_title: "ქრონოგრაფი სენტინელი", hotspot1_title: "ტაქიმეტრის ბეზელი", hotspot1_desc: "მთლიანი კერამიკული ბლოკისგან დამზადებული, ნაკაწრებისადმი მდგრადი და სიჩქარის ზუსტად გასაზომი.", hotspot2_title: "საფირის კრისტალი", hotspot2_desc: "პრაქტიკულად გაუცვეთელი საფირონის კრისტალი ანტი-ამრეკლი საფარით უზრუნველყოფს სრულყოფილ ხილვადობას.", hotspot3_title: "მზის სხივის ციფერბლატი", hotspot3_desc: "ღრმა შავი ციფერბლატი ირეკლავს სინათლეს, ქმნის დინამიურ ჩვენებას, რომელიც იცვლება ყოველი მოძრაობისას.",
            collection_title: "კოლექცია", price_from: " - დან", appointment_title: "დეტალებისთვის დაგვიკავშირდით", appointment_subtitle: "შეიგრძენით ევერლაქსის საათის წონა, ბალანსი და დეტალები. დაგეგმეთ პირადი, ვალდებულების გარეშე ვიზიტი.", form_name: "სრული სახელი", form_email: "ელ. ფოსტა", form_watch: "სასურველი საათი (ნებაყოფლობითი)", form_button: "გაგზავნა", footer_tagline: "დროის ხელოვნება.", footer_explore: "გამოიკვლიე", footer_support: "მხარდაჭერა", footer_faq: "ხშირად დასმული კითხვები", footer_warranty: "გარანტია", 
        },
        ru: { // Russian translations...
            logo: "Everlux", nav_ethos: "Наше видение", nav_featured: "Наши часы работы", nav_collection: "Коллекция", nav_appointment: "Контакт", hero_title: "Наследие и великолепие", hero_subtitle: "Создано не для того, чтобы показывать время, а для того, чтобы его определять",
ethos_title: "Дух мастерства", ethos_p1: "Everlux был создан с одним видением: создавать часы, которые являются не просто часами, а наследием. Каждые часы — это мир из более чем сотни деталей, симфония инженерии и искусства", ethos_p2: "Наша философия — терпеливое совершенство. Мы уважаем многовековые традиции часового дела и используем материалы и технологии будущего",
featured_title: "Chronograph Sentinel", hotspot1_title: "Tachymeter Bezel", hotspot1_desc: "Изготовлено из цельного куска керамика, устойчивая к царапинам и точная для измерения скорости.", hotspot2_title: "Сапфировое стекло", hotspot2_desc: "Практически устойчивое к царапинам сапфировое стекло с антибликовым покрытием обеспечивает идеальную видимость.", hotspot3_title: "Циферблат Sunray", hotspot3_desc: "Глубокий черный циферблат отражает свет, создавая динамичный дисплей, который меняется с каждым движением.",
collection_title: "Коллекция", price_from: " - from", appointment_title: "Свяжитесь с нами для получения подробной информации", appointment_subtitle: "Почувствуйте вес, баланс и детали часов Everlux. Запланируйте личный визит без обязательств.", form_name: "Полное имя", form_email: "Электронная почта", form_watch: "Ищу часы (необязательно)", form_button: "Отправить", footer_tagline: "время искусство", footer_explore: "Изучить", footer_support: "Поддержка", footer_faq: "Часто задаваемые вопросы", footer_warranty: "Гарантия",
   }
    };
    
    // --- FUNCTION: Burger menu toggle ---
    const handleNavToggle = () => {
        burger.classList.toggle('toggle');
        navMenu.classList.toggle('nav-active');
        document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
    };

    const closeNav = () => {
        burger.classList.remove('toggle');
        navMenu.classList.remove('nav-active');
        document.body.classList.remove('no-scroll');
    };

    // --- FUNCTION: Header scroll effect ---
    const handleHeaderScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    // --- FUNCTION: Language Translation (Slightly improved) ---
    const translatePage = (language) => {
        translatableElements.forEach(element => {
            const key = element.dataset.key;
            const translation = translations[language]?.[key];
            if (translation) {
                // More robust way to handle prices. We target the specific price_from key
                if (key === 'price_from') {
                    // This assumes the structure is always <span data-key="price_from">...</span> PRICE
                    // The translation text now only applies to the span.
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        localStorage.setItem('language', language);
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === language));
    };
    
    // --- FUNCTION: Hotspot Interaction ---
    // PASTE these new variables and functions in the same spot

// --- NEW: HOTSPOT CYCLING LOGIC ---
let hotspotInterval; // This will hold our timer
let userInteracted = false; // A flag to know when to stop the timer
let currentHotspotIndex = 0; // To keep track of which hotspot is showing

// This function cleanly shows a specific hotspot and its info
const activateHotspot = (index) => {
    hotspots.forEach(h => h.classList.remove('active'));
    hotspotInfos.forEach(info => info.classList.remove('active'));

    const activeHotspot = document.querySelector(`.hotspot[data-hotspot="${index + 1}"]`);
    const activeInfo = document.querySelector(`.hotspot-info[data-info="${index + 1}"]`);

    if (activeHotspot) activeHotspot.classList.add('active');
    if (activeInfo) activeInfo.classList.add('active');
};

// This function starts the automatic 5-second cycling
const startHotspotCycle = () => {
    clearInterval(hotspotInterval); // Clear any old timers first
    hotspotInterval = setInterval(() => {
        if (userInteracted) return; // Stop cycling if user has clicked
        currentHotspotIndex = (currentHotspotIndex + 1) % hotspots.length;
        activateHotspot(currentHotspotIndex);
    }, 5000); // 5000 milliseconds = 5 seconds
};

// This is the new click handler
const handleHotspotClick = (e) => {
    const targetHotspot = e.target.closest('.hotspot');
    if (!targetHotspot) return;

    // --- The most important part ---
    // On the first click, stop the cycle and hand control to the user
    if (!userInteracted) {
        clearInterval(hotspotInterval);
        userInteracted = true;
    }

    const hotspotId = targetHotspot.dataset.hotspot;
    currentHotspotIndex = parseInt(hotspotId) - 1; // Update our tracker
    activateHotspot(currentHotspotIndex); // Show the clicked hotspot immediately
};

    // --- ENHANCED: Animate on Scroll using Intersection Observer ---
    const handleScrollAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animation;
                
                // Handle staggered animations for child elements
                if (animationType === 'stagger-children') {
                    const children = entry.target.querySelectorAll('.watch-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 100}ms`;
                    });
                }
                
                // Add the 'visible' class to trigger the animation defined in CSS
                entry.target.classList.add('visible');

                // Stop observing the element once it has animated
                observer.unobserve(entry.target);
            }
        });
    };

    // --- INITIALIZATION & EVENT LISTENERS ---
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    burger.addEventListener('click', handleNavToggle);
    navLinks.forEach(link => link.addEventListener('click', closeNav));
    window.addEventListener('scroll', handleHeaderScroll);
    
    langButtons.forEach(button => {
        button.addEventListener('click', (e) => translatePage(e.target.dataset.lang));
    });
    const currentLang = localStorage.getItem('language') || 'en';
    translatePage(currentLang);

    const hotspotContainer = document.querySelector('.featured-watch-explorer');
    // REPLACE the block above with this new one to start the cycle
if (hotspotContainer) {
    hotspotContainer.addEventListener('click', handleHotspotClick);
    
    // Start the system:
    activateHotspot(0);      // Show the first hotspot immediately
    startHotspotCycle(); // And begin the automatic cycling
}

    // Initialize Intersection Observer
const scrollObserver = new IntersectionObserver(handleScrollAnimation, { root: null, threshold: 0.01, rootMargin: "0px 0px -50px 0px" });
    animatedElements.forEach(el => scrollObserver.observe(el));
});