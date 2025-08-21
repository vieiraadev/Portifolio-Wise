document.addEventListener('DOMContentLoaded', function() {
    const competencias = document.querySelector('.competencias');
    const titulo = document.querySelector('.competencias h2');
    
    if (!competencias || !titulo) {
        console.warn('Seção competencias ou título não encontrado');
        return;
    }
    
    let animacaoIniciada = false;
    
    const tituloObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animacaoIniciada) {
                animacaoIniciada = true;
                iniciarSequenciaAnimacao();
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    tituloObserver.observe(titulo);
    
    setTimeout(() => {
        if (!animacaoIniciada) {
            const rect = titulo.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animacaoIniciada = true;
                iniciarSequenciaAnimacao();
            }
        }
    }, 3000);
    
    function iniciarSequenciaAnimacao() {
        competencias.classList.add('show');
        
        setTimeout(() => {
            animarCardsVisiveis();
        }, 800);
    }
    
    function animarCardsVisiveis() {
        const activePageCards = document.querySelectorAll('.gallery-page.active .cartao-competencia');
        
        activePageCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 120);
        });
    }
    
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
                const currentCards = currentPageEl.querySelectorAll('.cartao-competencia');
                currentCards.forEach(card => {
                    card.classList.remove('animate-in');
                });
                
                currentPageEl.classList.remove('active');
            }
            
            const newPageEl = document.querySelector(`[data-page="${pageNum}"]`);
            if (newPageEl) {
                newPageEl.classList.add('active');
                
                if (animacaoIniciada) {
                    const newCards = newPageEl.querySelectorAll('.cartao-competencia');
                    newCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, index * 120); 
                    });
                }
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