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

document.addEventListener('DOMContentLoaded', () => {
    new TelaEntrada();
    console.log('Tela de entrada inicializada!');
});
