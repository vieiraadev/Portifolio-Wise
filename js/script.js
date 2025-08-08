const elementos = {
    telaEntrada: document.getElementById('telaEntrada'),
    botaoEntrar: document.getElementById('botaoEntrar')
};

class TelaEntrada {
    constructor() {
        this.inicializarEventos();
    }

    inicializarEventos() {
        elementos.botaoEntrar.addEventListener('click', () => {
            this.executarEntrada();
        });

        this.configurarIcones();
    }

    executarEntrada() {
        elementos.botaoEntrar.disabled = true;
        elementos.telaEntrada.classList.add('tela-saindo');
        
        setTimeout(() => {
            this.removerTela();
        }, 600);
    }

    removerTela() {
        elementos.telaEntrada.style.display = 'none';
    }

    configurarIcones() {
        const icones = document.querySelectorAll('.icone-container');
        
        icones.forEach(icone => {
            icone.addEventListener('mouseenter', () => {
                icone.style.transform = 'translateY(-5px) scale(1.05)';
            });
            
            icone.addEventListener('mouseleave', () => {
                icone.style.transform = 'translateY(0) scale(1)';
            });

            icone.addEventListener('click', () => {
                console.log('Ícone clicado:', icone.querySelector('i').className);
            });
        });
    }
}

function iniciarEfeitoDigitacao() {
    const urlSpan = document.querySelector('.url-site span');
    const texto = 'https://github.com/vieiraadev';
    
    urlSpan.textContent = '';
    urlSpan.classList.add('url-digitacao');
    
    let i = 0;
    const velocidade = 40;
    
    function digitar() {
        if (i < texto.length) {
            urlSpan.textContent += texto.charAt(i);
            i++;
            setTimeout(digitar, velocidade);
        } else {
            setTimeout(() => {
                urlSpan.classList.remove('url-digitacao');
            }, 1000);
        }
    }
    
    setTimeout(digitar, 2200);
}

document.addEventListener('DOMContentLoaded', () => {
    new TelaEntrada();
    iniciarEfeitoDigitacao();
    console.log('Tela de entrada inicializada!');
});