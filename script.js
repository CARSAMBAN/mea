document.addEventListener('DOMContentLoaded', function() {
  // Yılı güncelle
  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => obs.observe(r));

  // Nav toggle (mobil)
  const toggle = document.querySelector('.nav-toggle');
  toggle?.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
  });

  // HERO Slider
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  let currentSlide = 0;

  // Dots oluştur
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', ()=>goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  const dots = document.querySelectorAll('.dot');

  function showSlide(index){
    slides.forEach((s,i)=>{
      s.classList.toggle('active', i===index);
      dots[i].classList.toggle('active', i===index);
    });
  }
  showSlide(currentSlide);

  function goToSlide(index){
    currentSlide = index;
    showSlide(currentSlide);
  }

  // İleri / Geri
  prevBtn.addEventListener('click', ()=>{
    currentSlide = (currentSlide-1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });
  nextBtn.addEventListener('click', ()=>{
    currentSlide = (currentSlide+1) % slides.length;
    showSlide(currentSlide);
  });

  // Otomatik geçiş
  setInterval(()=>{
    currentSlide = (currentSlide+1) % slides.length;
    showSlide(currentSlide);
  }, 5000);
});
