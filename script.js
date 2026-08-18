// ==========================================================================
// INTERNET BY GAO - Interactive & Analytics Script
// Authorized AIS 3BB Fibre3 Dealer (Agent ID: 79467)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ========================================================================
  // 1. CONVERSION TRACKING & ANALYTICS HOOKS
  // ========================================================================
  // Initialize dataLayer if not already present
  window.dataLayer = window.dataLayer || [];

  /**
   * Normalize and Track Conversion Events for GTM & Google Ads
   * Supported types: 'line_click', 'phone_click', 'signup_click' (or 'line', 'phone', 'signup')
   * @param {string} type - Conversion event type
   * @param {HTMLElement} element - Clicked element
   */
  const trackConversion = (type, element) => {
    let eventName = 'conversion_click';
    if (type === 'line' || type === 'line_click') {
      eventName = 'line_click';
    } else if (type === 'phone' || type === 'phone_click') {
      eventName = 'phone_click';
    } else if (type === 'signup' || type === 'signup_click') {
      eventName = 'signup_click';
    } else if (type) {
      eventName = type;
    }

    const label = element.getAttribute('data-conversion-label') || element.textContent.trim() || eventName;
    const targetUrl = element.getAttribute('href') || '';
    
    // 1. Google Tag Manager / dataLayer push
    window.dataLayer.push({
      event: eventName,
      conversion_type: eventName,
      button_label: label,
      target_url: targetUrl,
      page_location: window.location.href,
      page_path: window.location.pathname,
      timestamp: new Date().toISOString()
    });

    // 2. Direct gtag support (if gtag is configured by user)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        event_category: 'Conversion',
        event_label: label,
        value: 1
      });

      // --------------------------------------------------------------------
      // [GOOGLE ADS CONVERSION TAG PLACEHOLDER]
      // To attach specific Google Ads conversion action IDs/labels:
      // Example:
      // if (eventName === 'line_click') {
      //   window.gtag('event', 'conversion', {'send_to': 'AW-18393127491/LINE_CONVERSION_LABEL'});
      // } else if (eventName === 'phone_click') {
      //   window.gtag('event', 'conversion', {'send_to': 'AW-18393127491/PHONE_CONVERSION_LABEL'});
      // } else if (eventName === 'signup_click') {
      //   window.gtag('event', 'conversion', {'send_to': 'AW-18393127491/SIGNUP_CONVERSION_LABEL'});
      // }
      // --------------------------------------------------------------------
    }

    console.log(`[Conversion Tracked] Event: ${eventName}, Label: ${label}`);
  };

  // Attach event listeners to all conversion elements
  document.querySelectorAll('[data-conversion]').forEach(button => {
    button.addEventListener('click', (e) => {
      const convType = button.getAttribute('data-conversion');
      trackConversion(convType, button);
    });
  });


  // ========================================================================
  // 2. NAVBAR & SCROLL EFFECTS
  // ========================================================================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background blur/darken
    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTop) {
      if (scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ========================================================================
  // 3. HAMBURGER & MOBILE NAVIGATION
  // ========================================================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link, .mobile-contact a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // ========================================================================
  // 4. INTERSECTION OBSERVER - SCROLL REVEAL ANIMATIONS
  // ========================================================================
  const animateElements = () => {
    const targets = document.querySelectorAll(
      '.package-card, .trust-item, .fibrelan-card, .fibrelan-group, .contact-card, .terms-card, .section-header'
    );

    if (!targets.length) return;

    targets.forEach(el => {
      el.classList.add('animate-on-scroll');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          if (parent) {
            const siblings = Array.from(parent.children).filter(child =>
              child.classList.contains('animate-on-scroll')
            );
            const index = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${Math.min(index * 0.07, 0.4)}s`;
          }

          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach(el => observer.observe(el));
  };

  animateElements();


  // ========================================================================
  // 5. SMOOTH SCROLLING FOR NAVIGATION
  // ========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || !href) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });


  // ========================================================================
  // 6. ACTIVE NAV LINK HIGHLIGHT
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      const scrollY = window.scrollY + 120;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
  }


  // ========================================================================
  // 7. SUBTLE CARD HOVER TILT FOR DESKTOP
  // ========================================================================
  if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches) {
    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `translateY(-6px) perspective(800px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

});
