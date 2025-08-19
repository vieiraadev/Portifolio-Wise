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
    scrollIndicatorHidden: false
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
        window.addEventListener('scroll', this.handleScroll.bind(this));
    },

    handleScroll() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        const scrolledDown = window.scrollY > 0;
        
        if (scrolledDown && !estado.scrollIndicatorHidden) {
            this.esconderIndicador(scrollIndicator);
        } else if (!scrolledDown && estado.scrollIndicatorHidden) {
            this.mostrarIndicador(scrollIndicator);
        }
    },

    esconderIndicador(elemento) {
        estado.scrollIndicatorHidden = true;
        elemento.classList.add('fade-out');
        
        setTimeout(() => {
            elemento.classList.add('hidden');
        }, 400);
    },

    mostrarIndicador(elemento) {
        estado.scrollIndicatorHidden = false;
        elemento.classList.remove('hidden', 'fade-out');
    }
};

const FormularioContato = {
    inicializar() {
        const form = document.getElementById('formularioContato');
        const status = document.getElementById('statusForm');
        
        if (!form || !status) return;
        
        form.addEventListener('submit', (e) => this.handleSubmit(e, form, status));
    },

    async handleSubmit(e, form, status) {
        e.preventDefault();
        
        if (this.isBot(form)) return;
        
        status.textContent = 'Enviando...';
        
        try {
            const resposta = await this.enviarFormulario(form);
            this.processarResposta(resposta, form, status);
        } catch (erro) {
            this.mostrarErroConexao(status);
        }
    },

    isBot(form) {
        const honeypot = form.querySelector('input[name="website"]');
        return honeypot && honeypot.value.trim() !== '';
    },

    async enviarFormulario(form) {
        return await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: new FormData(form)
        });
    },

    async processarResposta(resposta, form, status) {
        if (resposta.ok) {
            this.mostrarSucesso(form, status);
        } else {
            const mensagem = await this.extrairMensagemErro(resposta);
            this.mostrarErro(status, mensagem);
        }
    },

    mostrarSucesso(form, status) {
        form.reset();
        status.textContent = 'Mensagem enviada com sucesso! Vou entrar em contato em breve.';
    },

    async extrairMensagemErro(resposta) {
        let mensagem = 'Não foi possível enviar. Tente novamente em instantes.';
        
        try {
            const data = await resposta.json();
            if (data && data.message) {
                mensagem = data.message;
            }
        } catch (_) {}
        
        return mensagem;
    },

    mostrarErro(status, mensagem) {
        status.textContent = mensagem;
    },

    mostrarErroConexao(status) {
        status.textContent = 'Falha de conexão. Verifique sua internet e tente novamente.';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    TypewriterAnimation.iniciar();
    ScrollIndicator.inicializar();
    FormularioContato.inicializar();
});