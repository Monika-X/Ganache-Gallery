/* ==========================================================================
   GANACHE GALLERY - MASTER JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDirection();
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initScrollReveal();
  initFaqAccordion();
  initLightbox();
  initBackToTop();
  initInquiryDrawer();
  initBlogPagination();
  initIndexPortfolioFilter();
  initUniversalForms();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (Light / Dark)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const savedTheme = localStorage.getItem('ganache_theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('ganache_theme', newTheme);
      updateThemeIcons(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle i');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  });
}

/* --------------------------------------------------------------------------
   2. DIRECTION SWITCHER (LTR / RTL)
   -------------------------------------------------------------------------- */
function initDirection() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  const savedDir = localStorage.getItem('ganache_dir') || 'ltr';

  document.documentElement.setAttribute('dir', savedDir);
  updateRtlToggleText(savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('ganache_dir', newDir);
      updateRtlToggleText(newDir);
      showToast(`Layout orientation: ${newDir.toUpperCase()}`);
    });
  });
}

function updateRtlToggleText(dir) {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle');
  rtlToggleBtns.forEach(btn => {
    btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* --------------------------------------------------------------------------
   3. STICKY HEADER
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   4. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const backdrop = document.createElement('div');

  backdrop.className = 'nav-backdrop';
  backdrop.style.cssText = `
    position: fixed; inset: 0; background: rgba(18, 12, 11, 0.65); backdrop-filter: blur(4px); z-index: 998;
    opacity: 0; visibility: hidden; transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  document.body.appendChild(backdrop);

  const closeNav = () => {
    if (mobileNav) mobileNav.classList.remove('active');
    if (hamburger) hamburger.classList.remove('open');
    document.body.classList.remove('no-scroll');
    backdrop.style.opacity = '0';
    backdrop.style.visibility = 'hidden';
  };

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isActive = mobileNav.classList.toggle('active');
      hamburger.classList.toggle('open');
      if (isActive) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      backdrop.style.opacity = isActive ? '1' : '0';
      backdrop.style.visibility = isActive ? 'visible' : 'hidden';
    });

    backdrop.addEventListener('click', closeNav);

    const closeBtns = mobileNav.querySelectorAll('.mobile-nav-close, .mobile-link');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', closeNav);
    });
  }
}

/* --------------------------------------------------------------------------
   5. HERO SLIDER
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  const nextBtn = document.querySelector('.slider-btn.next');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  // Create dots if container exists
  if (dotsContainer && slides.length > 1) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    const dots = document.querySelectorAll('.slider-dots .dot');
    if (dots.length) dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    if (dots.length) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  function startTimer() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  startTimer();
}

/* --------------------------------------------------------------------------
   6. SCROLL REVEAL ANIMATION
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.faq-body');

      const isActive = item.classList.contains('active');

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        const b = i.querySelector('.faq-body');
        if (b) b.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
  let modal = document.querySelector('.lightbox-modal');

  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <div class="lightbox-content">
        <img src="" id="lightbox-img" alt="Enlarged Dessert Image" />
      </div>
    `;
    document.body.appendChild(modal);
  }

  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = modal.querySelector('.lightbox-close');

  lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const imgSrc = trigger.getAttribute('data-lightbox') || trigger.src;
      lightboxImg.src = imgSrc;
      modal.classList.add('active');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/* --------------------------------------------------------------------------
   9. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   10. INQUIRY DRAWER & TOAST SYSTEM
   -------------------------------------------------------------------------- */
function initInquiryDrawer() {
  window.inquiryItems = JSON.parse(localStorage.getItem('ganache_inquiry') || '[]');
  updateInquiryCount();
}

window.addToInquiry = function(title, price, img) {
  window.inquiryItems.push({ id: Date.now(), title, price, img });
  localStorage.setItem('ganache_inquiry', JSON.stringify(window.inquiryItems));
  updateInquiryCount();
  showToast(`Added "${title}" to your consultation brief!`);
};

function updateInquiryCount() {
  const badges = document.querySelectorAll('.badge-count');
  badges.forEach(b => b.textContent = window.inquiryItems.length);
}

function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.style.cssText = `
      position: fixed; bottom: 2rem; left: 2rem; z-index: 3000;
      display: flex; flex-direction: column; gap: 0.75rem; pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.style.cssText = `
    background: var(--color-dark-cocoa); color: var(--color-champagne-gold);
    padding: 0.85rem 1.5rem; border-radius: var(--radius-full);
    border: 1px solid var(--color-champagne-gold); font-size: 0.88rem; font-weight: 600;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3); opacity: 0; transform: translateY(20px);
    transition: all 0.35s ease;
  `;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   11. BLOG PAGE CARDS PAGINATION, CATEGORY FILTERING & LIVE SEARCH
   -------------------------------------------------------------------------- */
function initBlogPagination() {
  const cards = document.querySelectorAll('.blog-card-item');
  const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const loadMoreWrap = document.getElementById('load-more-wrap');
  const searchInput = document.getElementById('blog-search-input');
  const noResultsMsg = document.getElementById('no-search-results');

  if (!cards.length) return;

  const BATCH_SIZE = 3;
  let currentFilter = 'all';
  let currentlyShown = 3;
  let searchQuery = '';

  function renderGrid() {
    // 1. Filter cards by search query first
    const searchMatchingCards = Array.from(cards).filter(card => {
      if (!searchQuery) return true;
      const text = card.textContent.toLowerCase();
      return text.includes(searchQuery.toLowerCase());
    });

    // 2. Hide all cards
    cards.forEach(card => card.style.display = 'none');

    if (searchQuery) {
      // When searching, show all cards matching search query
      searchMatchingCards.forEach(card => {
        card.style.display = '';
      });

      if (loadMoreWrap) loadMoreWrap.style.display = 'none';
      if (noResultsMsg) {
        noResultsMsg.style.display = searchMatchingCards.length === 0 ? 'block' : 'none';
      }
    } else {
      // When not searching, apply active category filter & pagination
      if (noResultsMsg) noResultsMsg.style.display = 'none';

      const categoryMatchingCards = searchMatchingCards.filter(card => {
        const cat = card.getAttribute('data-category');
        return currentFilter === 'all' || cat === currentFilter;
      });

      categoryMatchingCards.forEach((card, index) => {
        if (currentFilter === 'all') {
          if (index < currentlyShown) {
            card.style.display = '';
          }
        } else {
          card.style.display = '';
        }
      });

      if (loadMoreWrap) {
        if (currentFilter === 'all' && currentlyShown < categoryMatchingCards.length) {
          loadMoreWrap.style.display = '';
        } else {
          loadMoreWrap.style.display = 'none';
        }
      }
    }
  }

  // Initial render
  renderGrid();

  // Search input live listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderGrid();
    });
  }

  // Category Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentFilter = btn.getAttribute('data-filter') || 'all';
      currentlyShown = 3;
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
      }
      renderGrid();
    });
  });

  // Load More Button Click (for 'all' filter)
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentlyShown += BATCH_SIZE;
      renderGrid();
    });
  }
}

/* --------------------------------------------------------------------------
   12. INDEX PAGE PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initIndexPortfolioFilter() {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  const filterBar = grid.previousElementSibling;
  if (!filterBar || !filterBar.classList.contains('filter-bar')) return;

  const filterBtns = filterBar.querySelectorAll('.filter-btn');
  const cards = grid.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   13. UNIVERSAL FORM SUBMISSION & INLINE SUCCESS MESSAGING
   -------------------------------------------------------------------------- */
function initUniversalForms() {
  document.querySelectorAll('form').forEach(form => {
    // Avoid double binding if handled by order calculator
    if (form.id === 'custom-order-wizard') return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let msg = 'Thank you! Your request has been submitted successfully.';
      if (form.classList.contains('footer-newsletter-form')) {
        msg = 'Thank you for subscribing to The Private List!';
      } else if (form.closest('#brief-builder')) {
        msg = 'Thank you! Your custom design brief has been submitted successfully to Chef Hélène.';
      } else if (form.querySelector('input[type="email"]') && document.title.includes('Maintenance')) {
        msg = 'You have been added to the VIP Re-Opening Access List!';
      } else if (form.querySelector('input[placeholder*="zip" i], input[placeholder*="Zip" i]')) {
        msg = 'Zipcode verified! Premium courier delivery is available for your location.';
      }

      handleFormSubmit(e, msg);
    });
  });
}

window.handleFormSubmit = function(e, message) {
  if (e && e.preventDefault) e.preventDefault();
  const form = e ? (e.target || e.srcElement) : null;
  const successMsg = message || 'Thank you! Action completed successfully.';
  
  if (form && form.reset) {
    // Refresh / Reset ONLY input fields
    form.reset();

    // Remove any previous inline success message in this form
    const existingAlert = form.querySelector('.form-success-alert');
    if (existingAlert) existingAlert.remove();

    // Create luxury inline success banner
    const alertBox = document.createElement('div');
    alertBox.className = 'form-success-alert';
    alertBox.style.cssText = `
      background: rgba(201, 168, 106, 0.15);
      color: var(--color-champagne-gold, #C9A86A);
      border: 1px solid var(--border-gold, #C9A86A);
      padding: 0.85rem 1.25rem;
      border-radius: var(--radius-md, 8px);
      margin-top: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      width: 100%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: fadeInUp 0.4s ease forwards;
    `;
    alertBox.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 1.15rem; color: var(--color-champagne-gold, #C9A86A);"></i> <span>${successMsg}</span>`;
    
    // Append inside or after form
    form.appendChild(alertBox);

    // Fade out inline success alert after 6 seconds
    setTimeout(() => {
      if (alertBox.parentNode) {
        alertBox.style.opacity = '0';
        alertBox.style.transition = 'opacity 0.5s ease';
        setTimeout(() => alertBox.remove(), 500);
      }
    }, 6000);
  }

  // Display floating toast message
  if (typeof showToast === 'function') {
    showToast(successMsg);
  }
  return false;
};
