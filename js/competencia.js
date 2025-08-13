document.addEventListener('DOMContentLoaded', function() {
    const competencias = document.querySelector('.competencias');
    if (!competencias) return;
    
    let ativado = false;
    
    function ativarAnimacao() {
      if (ativado) return;
      
      const rect = competencias.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight * 0.7) {
        competencias.classList.add('show');
        ativado = true;
        window.removeEventListener('scroll', ativarAnimacao);
      }
    }
    
    window.addEventListener('scroll', ativarAnimacao);
    setTimeout(ativarAnimacao, 500);
    
    setTimeout(() => {
      if (!ativado) {
        competencias.classList.add('show');
        ativado = true;
      }
    }, 2000);
  });