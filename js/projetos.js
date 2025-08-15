function toggleDescricao(button) {
    const container = button.closest('.cartao-projeto').querySelector('.container-descricao');
    const descricaoElement = container.querySelector('.descricao');
    const isExpanded = container.classList.contains('expandido');
    
    if (!isExpanded) {
        container.classList.add('expandido');
        button.classList.add('ativo');
        button.innerHTML = '<i class="bx bx-chevron-up"></i> Ocultar descrição';
        startTypingEffect(descricaoElement);
    } else {
        container.classList.remove('expandido');
        button.classList.remove('ativo');
        button.innerHTML = '<i class="bx bx-chevron-down"></i> Ver descrição';
        descricaoElement.innerHTML = '';
    }
}

function startTypingEffect(element) {
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;
    const speed = 40;
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            element.innerHTML += '<span class="cursor-digitacao">&nbsp;</span>';
            setTimeout(() => {
                const cursor = element.querySelector('.cursor-digitacao');
                if (cursor) cursor.remove();
            }, 3000);
        }
    }
    typeWriter();
}