const textos = ["Trainee na Wise Systems", "Engenheiro de software"];
let textoAtual = 0;
let caracterAtual = 0;
let deletando = false;
let scrollIndicatorHidden = false;

function digitarTexto() {
    const elemento = document.getElementById("texto");
    const textoCompleto = textos[textoAtual];
    
    if (deletando) {
        elemento.textContent = textoCompleto.substring(0, caracterAtual - 1);
        caracterAtual--;
    } else {
        elemento.textContent = textoCompleto.substring(0, caracterAtual + 1);
        caracterAtual++;
    }
    
    let velocidade = 100;
    if (deletando) {
        velocidade /= 2;
    }
    
    if (!deletando && caracterAtual === textoCompleto.length) {
        velocidade = 2000;
        deletando = true;
    } else if (deletando && caracterAtual === 0) {
        deletando = false;
        textoAtual = (textoAtual + 1) % textos.length;
        velocidade = 500;
    }
    
    setTimeout(digitarTexto, velocidade);
}

window.addEventListener('scroll', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator && window.scrollY > 0 && !scrollIndicatorHidden) {
        scrollIndicatorHidden = true;
        scrollIndicator.classList.add('fade-out');

        setTimeout(() => {
            scrollIndicator.classList.add('hidden');
        }, 400);
        
    } else if (scrollIndicator && window.scrollY === 0 && scrollIndicatorHidden) {
        scrollIndicatorHidden = false;
        scrollIndicator.classList.remove('hidden', 'fade-out');
    }
});

setTimeout(digitarTexto, 3500);