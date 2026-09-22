document.addEventListener('DOMContentLoaded', () => {
    /*
     * ============================================
     * 1. DATA RENDERING
     * ============================================
     */
    if (typeof SITE_DATA !== 'undefined') {
        renderStats()
        renderProducts()
        renderWhyTeknic()
        renderIndustries()
    } else {
        console.error('SITE_DATA is not defined. Ensure data.js is loaded before script.js.')
    }

    /*
     * ============================================
     * 2. INITIALIZE WEBSITE FEATURES
     * ============================================
     */
    initNavbar()
    initActiveNavigation()
    initMfgCarousel()
    initScrollAnimations()
    initSmoothScroll()
})

/*
 * ============================================
 * 1. RENDER STATISTICS
 * ============================================
 */
function renderStats() {
    const container = document.getElementById('statsGrid')
    if (!container || !SITE_DATA.stats) return

    container.innerHTML = SITE_DATA.stats
        .map(stat => `
            <article class="stat-card">
                <div class="stat-icon-wrap">
                    <img
                        src="${stat.icon}"
                        alt=""
                        width="60"
                        height="60"
                        loading="lazy"
                    >
                </div>
                <h3 class="stat-val">
                    ${stat.val || stat.value || ''}
                </h3>
                <p class="stat-desc">
                    ${stat.desc || stat.description || ''}
                </p>
            </article>
        `)
        .join('')
}

/*
 * ============================================
 * 2. RENDER PRODUCTS
 * ============================================
 */
function renderProducts() {
    const container = document.getElementById('productsGrid')
    if (!container || !SITE_DATA.products) return

    container.innerHTML = SITE_DATA.products
        .map(product => `
            <article class="product-card">
                <div class="prod-cat-header">
                    <span class="prod-cat-tag">
                        ${product.tag}
                    </span>
                </div>

                <div class="prod-image-stage">
                    <img
                        src="${product.img || product.image || ''}"
                        alt="${product.tag}"
                        class="prod-img"
                        loading="lazy"
                    >
                </div>

                <div class="prod-info-block">
                    <h3 class="prod-item-title">
                        ${product.title}
                    </h3>

                    <p class="prod-item-desc">
                        ${product.desc || product.description || ''}
                    </p>

                    <a
                        href="${product.link || '#contact'}"
                        class="btn-prod-chamfer"
                    >
                        <span>
                            ${product.btnText || product.buttonText || 'EXPLORE RANGE'}
                        </span>
                    </a>
                </div>
            </article>
        `)
        .join('')
}

/*
 * ============================================
 * 3. RENDER WHY TEKNIC EUCHNER
 * ============================================
 */
function renderWhyTeknic() {
    const container = document.getElementById('whyCardsGrid')
    if (!container || !SITE_DATA.whyFeatures) return

    container.innerHTML = SITE_DATA.whyFeatures
        .map(feature => `
            <article class="why-card-item">
                <div class="why-card-top">
                    <h3 class="why-card-title">
                        ${feature.title}
                    </h3>

                    <div class="why-badge-wrap">
                        <img
                            src="${feature.icon || 'assets/icons/svg/webhook.svg'}"
                            alt=""
                            width="22"
                            height="22"
                            loading="lazy"
                        >
                    </div>
                </div>

                <p class="why-card-copy">
                    ${feature.desc || feature.description || ''}
                </p>
            </article>
        `)
        .join('')
}

/*
 * ============================================
 * 4. RENDER INDUSTRIES
 * ============================================
 */
function renderIndustries() {
    const container = document.getElementById('industriesTable')
    if (!container || !SITE_DATA.industries) return

    container.innerHTML = SITE_DATA.industries
        .map(industry => `
            <div class="ind-row">
                <span class="ind-num">
                    ${industry.num || industry.number || ''}
                </span>

                <span class="ind-title">
                    ${industry.title}
                </span>

                <span class="ind-desc">
                    ${industry.desc || industry.description || ''}
                </span>
            </div>
        `)
        .join('')
}

/*
 * ============================================
 * 5. NAVIGATION
 * ============================================
 */
function initNavbar() {
    const menuButton = document.getElementById('mobileMenuBtn')
    const navLinks = document.getElementById('navLinks')
    const navbar = document.getElementById('navbar')

    if (menuButton && navLinks) {
        menuButton.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-open')
            menuButton.classList.toggle('active', isOpen)
            menuButton.setAttribute('aria-expanded', String(isOpen))
        })

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open')
                menuButton.classList.remove('active')
                menuButton.setAttribute('aria-expanded', 'false')
            })
        })
    }

    if (navbar) {
        window.addEventListener(
            'scroll',
            () => {
                navbar.classList.toggle('scrolled', window.scrollY > 40)
            },
            { passive: true }
        )
    }
}

/*
 * ============================================
 * 6. ACTIVE NAVIGATION SPY
 * ============================================
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]')
    const navItems = document.querySelectorAll('.nav-link')

    if (!sections.length || !navItems.length) return

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 160 // Header height offset

        sections.forEach(section => {
            const top = section.offsetTop
            const height = section.offsetHeight
            const id = section.getAttribute('id')

            if (scrollPosition >= top && scrollPosition < top + height) {
                navItems.forEach(link => {
                    const linkTarget = link.getAttribute('href')
                    if (linkTarget === `#${id}`) {
                        link.classList.add('active')
                    } else {
                        link.classList.remove('active')
                    }
                })
            }
        })
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true })
    updateActiveNav()
}

/*
 * ============================================
 * 7. MANUFACTURING CAROUSEL
 * ============================================
 */
function initMfgCarousel() {
    const slider = document.getElementById('mfgSlider')
    if (!slider) return

    const slides = slider.querySelectorAll('.mfg-slide')
    if (slides.length <= 1) return

    let currentIndex = 0
    const intervalDuration = 3500

    setInterval(() => {
        slides[currentIndex].classList.remove('active')
        currentIndex = (currentIndex + 1) % slides.length
        slides[currentIndex].classList.add('active')
    }, intervalDuration)
}

/*
 * ============================================
 * 8. SCROLL REVEAL ANIMATIONS
 * ============================================
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        '.product-card, .why-card-item, .stat-card, .ind-row'
    )

    if (!elements.length) return

    if (!('IntersectionObserver' in window)) {
        elements.forEach(element => element.classList.add('in-view'))
        return
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('in-view')
            obs.unobserve(entry.target)
        })
    }, observerOptions)

    elements.forEach(element => observer.observe(element))
}

/*
 * ============================================
 * 9. SMOOTH SCROLL WITH NAVBAR OFFSET
 * ============================================
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href')
            if (targetId === '#') return

            const targetElement = document.querySelector(targetId)
            if (targetElement) {
                e.preventDefault()
                const navHeight = document.querySelector('.navbar-wrapper')?.offsetHeight || 70
                const elementPosition = targetElement.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - navHeight

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        })
    })
}