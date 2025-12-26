// ===== NAVBAR ANIMATIONS =====
const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll("#navMenu a");

// Navbar scroll efekti
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
    
    // Yukarı scroll'da göster, aşağı scroll'da gizle
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.style.transform = 'translateY(-100%)';
      navbar.style.transition = 'transform 0.3s ease';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.classList.remove('scrolled');
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
  updateActiveLink();
});

// Aktif link takibi
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Menüden linke tıklayınca kapat
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.style.overflow = '';
  });
});

// ESC tuşu ile menü kapatma
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

// ===== FORM SUBMISSION =====
document.getElementById("teklifForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ad = document.getElementById("ad").value.trim();
  const tel = document.getElementById("telefon").value.trim();
  const hizmet = document.getElementById("hizmet").value;
  const mesaj = document.getElementById("mesaj").value.trim();

  // Form validation
  if (!ad || !tel) {
    alert("Lütfen adınızı ve telefon numaranızı giriniz.");
    return;
  }

  const whatsappMesaj =
    `Merhaba, teklif almak istiyorum.%0A%0A` +
    `👤 Ad Soyad: ${ad}%0A` +
    `📞 Telefon: ${tel}%0A` +
    `🎥 Hizmet: ${hizmet}%0A` +
    `📝 Not: ${mesaj || 'Yok'}`;

  // Button loading state
  const button = this.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Yönlendiriliyor...';
  button.disabled = true;

  setTimeout(() => {
    window.open(`https://wa.me/905417679111?text=${whatsappMesaj}`, "_blank");
    button.textContent = originalText;
    button.disabled = false;
    
    // Formu temizle
    this.reset();
  }, 1000);
});

// ===== SOCIAL MEDIA ANIMATIONS =====
document.addEventListener('DOMContentLoaded', () => {
  const socialButtons = document.querySelectorAll('.social');
  
  // Ripple efekti için CSS ekle
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Buton tıklama animasyonu
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Ripple efekti
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
      `;
      
      this.appendChild(ripple);
      
      // Ripple'ı temizle
      setTimeout(() => ripple.remove(), 600);
      
      // Buton bounce efekti
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
    
    // Logo hover animasyonu
    const logo = button.querySelector('.social-logo');
    if (logo) {
      button.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.2) rotate(5deg)';
      });
      
      button.addEventListener('mouseleave', () => {
        logo.style.transform = '';
      });
    }
  });
  
  // Logo yükleme animasyonu
  const socialLogos = document.querySelectorAll('.social-logo');
  socialLogos.forEach(logo => {
    logo.addEventListener('load', function() {
      this.style.animation = 'logo-pulse 3s ease-in-out infinite';
    });
  });
});

// ===== PAGE LOAD ANIMATIONS =====
window.addEventListener('load', () => {
  // Başlangıçta navbar'ı göster
  navbar.style.opacity = '1';
  
  // Cards'lara gecikmeli animasyon
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animated');
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

// Tüm section'ları observe et
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

// Sayfa yüklendiğinde aktif linki ayarla
updateActiveLink();