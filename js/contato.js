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
    FormularioContato.inicializar();
});