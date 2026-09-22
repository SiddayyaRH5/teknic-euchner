document.addEventListener("DOMContentLoaded", () => {
    // Verify SITE_DATA exists before attempting to render
    if (typeof SITE_DATA !== "undefined") {
        renderStats();
        renderProducts();
        renderWhyTeknic();
        renderIndustries();
    } else {
        console.error("SITE_DATA is not defined. Ensure data.js is loaded before script.js.");
    }

    initNavbar();
    initMfgCarousel();
    initScrollAnimations();
    initSmoothScroll();
});

/**
 * 1. Render Statistics Cards
 */
function renderStats() {
    const statsContainer = document.getElementById("statsGrid");
    if (!statsContainer || !SITE_DATA.stats) return;

    statsContainer.innerHTML = SITE_DATA.stats.map(stat => `
        <div class="stat-card">
            <div class="stat-icon-wrap">
                <img src="${stat.icon}" alt="${stat.val}" width="60" height="60" loading="lazy" />
            </div>
            <div class="stat-val">${stat.val}</div>
            <div class="stat-desc">${stat.desc}</div>
        </div>
    `).join("");
}

/**
 * 2. Render Product Cards
 */
function renderProducts() {
    const productsContainer = document.getElementById("productsGrid");
    if (!productsContainer || !SITE_DATA.products) return;

    productsContainer.innerHTML = SITE_DATA.products.map(prod => `
        <article class="product-card">
            <div class="prod-cat-header">
                <span class="prod-cat-tag">${prod.tag}</span>
            </div>
            <div class="prod-image-stage">
                <img src="${prod.img}" alt="${prod.tag}" class="prod-img" loading="lazy" />
            </div>
            <div class="prod-info-block">
                <h3 class="prod-item-title">${prod.title}</h3>
                <p class="prod-item-desc">${prod.desc}</p>
                <a href="${prod.link || '#contact'}" class="btn-prod-chamfer">
                    <span>${prod.btnText}</span>
                </a>
            </div>
        </article>
    `).join("");
}

/**
 * 3. Render "Why Teknic Euchner" Feature Cards
 */
function renderWhyTeknic() {
    const whyContainer = document.getElementById("whyCardsGrid");
    if (!whyContainer || !SITE_DATA.whyFeatures) return;

    whyContainer.innerHTML = SITE_DATA.whyFeatures.map(item => `
        <div class="why-card-item">
            <div class="why-card-top">
                <h3 class="why-card-title">${item.title}</h3>
                <div class="why-badge-wrap">
                    <img src="${item.icon || 'assets/icons/svg/webhook.svg'}" alt="" width="22" height="22" loading="lazy" />
                </div>
            </div>
            <p class="why-card-copy">${item.desc}</p>
        </div>
    `).join("");
}

/**
 * 4. Render Industries / Applications Rows
 */
function renderIndustries() {
    const industriesContainer = document.getElementById("industriesTable");
    if (!industriesContainer || !SITE_DATA.industries) return;

    industriesContainer.innerHTML = SITE_DATA.industries.map(ind => `
        <div class="ind-row">
            <span class="ind-num">${ind.num}</span>
            <span class="ind-title">${ind.title}</span>
            <span class="ind-desc">${ind.desc}</span>
        </div>
    `).join("");
}

/**
 * 5. Mobile Navigation & Sticky Header State
 */
function initNavbar() {
    const menuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("nav-open");
            menuBtn.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });

        // Close mobile drawer when any link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("nav-open");
                menuBtn.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Toggle background state on page scroll
    window.addEventListener("scroll", () => {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }
    }, { passive: true });
}

/**
 * 6. Manufacturing Showcase Carousel (Auto Cross-Fade)
 */
function initMfgCarousel() {
    const slider = document.getElementById("mfgSlider");
    if (!slider) return;

    const slides = slider.querySelectorAll(".mfg-slide");
    if (slides.length <= 1) return;

    let currentIndex = 0;
    const intervalDuration = 3500; // 3.5 seconds per slide

    setInterval(() => {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
    }, intervalDuration);
}

/**
 * 7. Intersection Observer for Scroll Fade-In Elements
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll(".product-card, .why-card-item, .stat-card, .ind-row");

    if (!("IntersectionObserver" in window)) {
        // Fallback for older browsers without observer support
        elementsToAnimate.forEach(el => el.classList.add("in-view"));
        return;
    }

    const observerOptions = {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => scrollObserver.observe(el));
}

/**
 * 8. Smooth Scrolling with Fixed Navbar Offset Correction
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector(".navbar-wrapper")?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}