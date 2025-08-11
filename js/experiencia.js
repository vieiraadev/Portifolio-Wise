document.querySelectorAll('.conteudo-card').forEach((el) => {
    el.addEventListener('focus', () => el.classList.add('focado'));
    el.addEventListener('blur',  () => el.classList.remove('focado'));
  });

function initTimelineAnimation() {

    function isInViewport(element, threshold = 0.3) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    }

    function animateOnScroll() {
        const experienciaSection = document.querySelector('.experiencia');
        const timelineCards = document.querySelectorAll('.card-tempo');

        if (experienciaSection && isInViewport(experienciaSection, 0.2)) {
            experienciaSection.classList.add('show');
        }
        
        timelineCards.forEach((card, index) => {
            if (isInViewport(card, 0.4) && !card.classList.contains('animate')) {
                const ordem = parseInt(card.dataset.ordem) || (index + 1);
                setTimeout(() => {
                    card.classList.add('animate');
                }, ordem * 100);
            }
        });
    }

    if ('IntersectionObserver' in window) {
        
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    if (entry.target.classList.contains('experiencia')) {
                        entry.target.classList.add('show');
                    } 
                    else if (entry.target.classList.contains('card-tempo')) {
                        const ordem = parseInt(entry.target.dataset.ordem) || 1;
                        
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, (ordem - 1) * 150);
                        
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.addEventListener('DOMContentLoaded', () => {
            const experienciaSection = document.querySelector('.experiencia');
            const timelineCards = document.querySelectorAll('.card-tempo');
            
            if (experienciaSection) {
                observer.observe(experienciaSection);
            }
            
            timelineCards.forEach(card => {
                observer.observe(card);
            });
        });

    } else {
        let ticking = false;
        
        function updateAnimations() {
            animateOnScroll();
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        });

        document.addEventListener('DOMContentLoaded', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
    }

    window.resetTimelineAnimation = function() {
        const experienciaSection = document.querySelector('.experiencia');
        const timelineCards = document.querySelectorAll('.card-tempo');
        
        if (experienciaSection) {
            experienciaSection.classList.remove('show');
        }
        
        timelineCards.forEach(card => {
            card.classList.remove('animate');
        });
        setTimeout(animateOnScroll, 100);
    };
    window.addEventListener('orientationchange', () => {
        setTimeout(animateOnScroll, 300);
    });

    window.addEventListener('load', () => {
        setTimeout(animateOnScroll, 100);
    });
}

initTimelineAnimation();