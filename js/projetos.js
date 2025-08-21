let activeTimeouts = new Map();

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
        clearTypingEffect(descricaoElement);
        
        container.classList.remove('expandido');
        button.classList.remove('ativo');
        button.innerHTML = '<i class="bx bx-chevron-down"></i> Ver descrição';
        descricaoElement.innerHTML = '';
    }
}

function startTypingEffect(element) {
    clearTypingEffect(element);
    
    const text = element.getAttribute('data-text');
    element.innerHTML = '';
    let i = 0;
    const speed = 40;
    
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            const timeoutId = setTimeout(typeWriter, speed);
            activeTimeouts.set(element, timeoutId);
        } else {
            element.innerHTML += '<span class="cursor-digitacao">&nbsp;</span>';
            
            const cursorTimeoutId = setTimeout(() => {
                const cursor = element.querySelector('.cursor-digitacao');
                if (cursor) cursor.remove();
                activeTimeouts.delete(element);
            }, 3000);
            
            activeTimeouts.set(element, cursorTimeoutId);
        }
    }
    
    typeWriter();
}

function clearTypingEffect(element) {
    if (activeTimeouts.has(element)) {
        clearTimeout(activeTimeouts.get(element));
        activeTimeouts.delete(element);
    }
    
    const cursor = element.querySelector('.cursor-digitacao');
    if (cursor) cursor.remove();
}