const botaoHamburguer = document.getElementById('botaoHamburguer');
const menuNavegacao = document.getElementById('menuNavegacao');
const linksNavegacao = document.querySelectorAll('.link-navegacao');

botaoHamburguer.addEventListener('click', () => {
    botaoHamburguer.classList.toggle('ativo');
    menuNavegacao.classList.toggle('ativo');
});

linksNavegacao.forEach(link => {
    link.addEventListener('click', () => {
        botaoHamburguer.classList.remove('ativo');
        menuNavegacao.classList.remove('ativo');
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        botaoHamburguer.classList.remove('ativo');
        menuNavegacao.classList.remove('ativo');
    }
});