document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isAuthenticated') !== 'true') {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html'; // Redireciona para a página de login
    }
});