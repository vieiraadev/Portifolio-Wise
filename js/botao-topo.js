(function() {
    const botaoTopo = document.getElementById('botaoTopo');
    
    function toggleBotaoTopo() {
        if (window.pageYOffset > 300) {
            botaoTopo.classList.add('mostrar');
        } else {
            botaoTopo.classList.remove('mostrar');
        }
    }
    
    function voltarAoTopo() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    window.addEventListener('scroll', toggleBotaoTopo);
    botaoTopo.addEventListener('click', voltarAoTopo);
    
    toggleBotaoTopo();
})();