const CONFIG = {
    textos: ["Trainee na Wise Systems", "Engenheiro de software"],
    velocidades: {
        digitacao: 100,
        deletacao: 50,
        pausa: 2000,
        transicao: 500
    },
    inicioDelay: 3500
};

let estado = {
    textoAtual: 0,
    caracterAtual: 0,
    deletando: false,
    scrollIndicatorHidden: false,
    isAnimating: false
};

const TypewriterAnimation = {
    iniciar() {
        setTimeout(this.digitarTexto.bind(this), CONFIG.inicioDelay);
    },

    digitarTexto() {
        const elemento = document.getElementById("texto");
        const textoCompleto = CONFIG.textos[estado.textoAtual];
        
        this.atualizarTexto(elemento, textoCompleto);
        const velocidade = this.calcularVelocidade(textoCompleto);
        
        setTimeout(this.digitarTexto.bind(this), velocidade);
    },

    atualizarTexto(elemento, textoCompleto) {
        if (estado.deletando) {
            elemento.textContent = textoCompleto.substring(0, estado.caracterAtual - 1);
            estado.caracterAtual--;
        } else {
            elemento.textContent = textoCompleto.substring(0, estado.caracterAtual + 1);
            estado.caracterAtual++;
        }
    },

    calcularVelocidade(textoCompleto) {
        let velocidade = CONFIG.velocidades.digitacao;
        
        if (estado.deletando) {
            velocidade = CONFIG.velocidades.deletacao;
        }
        
        if (!estado.deletando && estado.caracterAtual === textoCompleto.length) {
            velocidade = CONFIG.velocidades.pausa;
            estado.deletando = true;
        } 
        else if (estado.deletando && estado.caracterAtual === 0) {
            estado.deletando = false;
            estado.textoAtual = (estado.textoAtual + 1) % CONFIG.textos.length;
            velocidade = CONFIG.velocidades.transicao;
        }
        
        return velocidade;
    }
};

const ScrollIndicator = {
    inicializar() {
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        this.adicionarEventoClique();
    },

    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            }
        };
    },

    handleScroll() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator || estado.isAnimating) return;

        const scrolledDown = window.scrollY > 50;
        
        if (scrolledDown && !estado.scrollIndicatorHidden) {
            this.esconderIndicador(scrollIndicator);
        } else if (!scrolledDown && estado.scrollIndicatorHidden) {
            this.mostrarIndicador(scrollIndicator);
        }
    },

    esconderIndicador(elemento) {
        if (estado.isAnimating) return;
        
        estado.scrollIndicatorHidden = true;
        estado.isAnimating = true;

        elemento.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.6, 1)';
        elemento.style.transform = 'translateX(-50%) translateY(30px) scale(0.7) rotate(180deg)';
        elemento.style.opacity = '0';
        elemento.style.filter = 'blur(10px)';
        
        const scrollText = elemento.querySelector('.scroll-text');
        const scrollContainer = elemento.querySelector('.scroll-container');
        const scrollDot = elemento.querySelector('.scroll-dot');
        
        if (scrollText) {
            scrollText.style.transition = 'all 0.4s ease-out';
            scrollText.style.transform = 'translateY(-20px)';
            scrollText.style.opacity = '0';
        }
        
        if (scrollContainer) {
            scrollContainer.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            scrollContainer.style.transform = 'scale(0.3) rotate(360deg)';
            scrollContainer.style.borderColor = 'transparent';
        }
        
        if (scrollDot) {
            scrollDot.style.transition = 'all 0.5s ease-in-out';
            scrollDot.style.transform = 'translateX(-50%) translateY(60px) scale(0)';
        }
        
        setTimeout(() => {
            elemento.style.visibility = 'hidden';
            elemento.style.pointerEvents = 'none';
            estado.isAnimating = false;
        }, 500);
    },

    mostrarIndicador(elemento) {
        if (estado.isAnimating) return;
        
        estado.scrollIndicatorHidden = false;
        estado.isAnimating = true;

        elemento.style.visibility = 'visible';
        elemento.style.pointerEvents = 'auto';
        
        elemento.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        elemento.style.transform = 'translateX(-50%) translateY(0) scale(1) rotate(0deg)';
        elemento.style.opacity = '1';
        elemento.style.filter = 'blur(0px)';
        
        const scrollText = elemento.querySelector('.scroll-text');
        const scrollContainer = elemento.querySelector('.scroll-container');
        const scrollDot = elemento.querySelector('.scroll-dot');
        
        if (scrollText) {
            setTimeout(() => {
                scrollText.style.transform = 'translateY(0)';
                scrollText.style.opacity = '1';
            }, 200);
        }
        
        if (scrollContainer) {
            setTimeout(() => {
                scrollContainer.style.transform = 'scale(1) rotate(0deg)';
                scrollContainer.style.borderColor = 'rgba(0, 123, 255, 0.6)';
            }, 100);
        }
        
        if (scrollDot) {
            setTimeout(() => {
                scrollDot.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 300);
        }
        
        setTimeout(() => {
            estado.isAnimating = false;
        }, 600);
    },

    adicionarEventoClique() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', this.scrollSuave.bind(this));
        }
    },

    scrollSuave() {
        const targetScroll = window.innerHeight;
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
        
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0) scale(0.9)';
            
            setTimeout(() => {
                scrollIndicator.style.transform = 'translateX(-50%) translateY(0) scale(1)';
            }, 150);
        }
    }
};

const adicionarEstilosPersonalizados = () => {
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            will-change: transform, opacity, filter;
        }
        
        .scroll-indicator.animating * {
            will-change: transform, opacity, border-color;
        }
        
        .scroll-indicator:active {
            transform: translateX(-50%) translateY(0) scale(0.95) !important;
        }
        
        /* Efeito de hover mais suave */
        .scroll-indicator:hover {
            animation-play-state: paused;
        }
        
        .scroll-indicator:hover .scroll-container {
            transform: scale(1.1);
            border-color: #007bff !important;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.4);
        }
        
        .scroll-indicator:hover .scroll-dot {
            transform: translateX(-50%) translateY(15px) scale(1.2) !important;
            box-shadow: 0 0 20px rgba(0, 123, 255, 0.8);
        }
    `;
    document.head.appendChild(style);
};

document.addEventListener('DOMContentLoaded', () => {
    TypewriterAnimation.iniciar();
    ScrollIndicator.inicializar();
    adicionarEstilosPersonalizados();
});