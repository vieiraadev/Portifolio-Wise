const textos = ["Trainee na Wise Systems", "Engenheiro de software"];
let textoAtual = 0;
let caracterAtual = 0;
let deletando = false;

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

// Iniciar o efeito após as animações de texto terminarem
setTimeout(digitarTexto, 3500);