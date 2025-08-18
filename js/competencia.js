// Script completo para a seção de competências
document.addEventListener('DOMContentLoaded', function() {
  const competencias = document.querySelector('.competencias');
  if (!competencias) return;
  
  let ativado = false;
  
  function ativarAnimacao() {
      if (ativado) return;
      
      const rect = competencias.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight * 0.7) {
          competencias.classList.add('show');
          ativado = true;
          window.removeEventListener('scroll', ativarAnimacao);
      }
  }
  
  window.addEventListener('scroll', ativarAnimacao);
  setTimeout(ativarAnimacao, 500);
  
  setTimeout(() => {
      if (!ativado) {
          competencias.classList.add('show');
          ativado = true;
      }
  }, 2000);
  
  class CompetenciasGallery {
      constructor() {
          this.currentPage = 1;
          this.totalPages = 2;
          this.init();
      }
      
      init() {
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');
          const dots = document.querySelectorAll('.dot');
          
          if (!prevBtn || !nextBtn || dots.length === 0) {
              console.warn('Elementos da galeria não encontrados');
              return;
          }
          
          this.bindEvents();
          this.updateControls();
      }
      
      bindEvents() {
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');
          
          if (prevBtn) {
              prevBtn.addEventListener('click', () => {
                  this.goToPage(this.currentPage - 1);
              });
          }
          
          if (nextBtn) {
              nextBtn.addEventListener('click', () => {
                  this.goToPage(this.currentPage + 1);
              });
          }
          
          document.querySelectorAll('.dot').forEach(dot => {
              dot.addEventListener('click', () => {
                  const pageNum = parseInt(dot.dataset.page);
                  this.goToPage(pageNum);
              });
          });
          
          document.addEventListener('keydown', (e) => {
              const competenciasSection = document.querySelector('#competencias');
              if (!competenciasSection) return;
              
              const rect = competenciasSection.getBoundingClientRect();
              const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
              
              if (isVisible) {
                  if (e.key === 'ArrowLeft' && this.currentPage > 1) {
                      e.preventDefault();
                      this.goToPage(this.currentPage - 1);
                  } else if (e.key === 'ArrowRight' && this.currentPage < this.totalPages) {
                      e.preventDefault();
                      this.goToPage(this.currentPage + 1);
                  }
              }
          });
      }
      
      goToPage(pageNum) {
          if (pageNum < 1 || pageNum > this.totalPages || pageNum === this.currentPage) {
              return;
          }
          
          const currentPageEl = document.querySelector('.gallery-page.active');
          if (currentPageEl) {
              currentPageEl.classList.remove('active');
          }
          
          const newPageEl = document.querySelector(`[data-page="${pageNum}"]`);
          if (newPageEl) {
              newPageEl.classList.add('active');
          }
          
          this.currentPage = pageNum;
          this.updateControls();
      }
      
      updateControls() {
          const prevBtn = document.getElementById('prevBtn');
          const nextBtn = document.getElementById('nextBtn');
          
          if (prevBtn) {
              prevBtn.disabled = this.currentPage === 1;
          }
          
          if (nextBtn) {
              nextBtn.disabled = this.currentPage === this.totalPages;
          }

          document.querySelectorAll('.dot').forEach(dot => {
              const pageNum = parseInt(dot.dataset.page);
              dot.classList.toggle('active', pageNum === this.currentPage);
          });
      }
  }
  
  setTimeout(() => {
      new CompetenciasGallery();
  }, 100);
});