function mostrarMais() {
    const escondido = document.querySelector('.corpo-habilidades.escondido');
    const botao = document.querySelector('.btn-ver-mais');
    const container = document.querySelector('.container-cursos');
    const larguraTela = window.innerWidth;

    console.log("Largura da tela: ", larguraTela); // Verifica o tamanho da tela no console

    if (larguraTela <= 690) {
      console.log("Tamanho de tela <= 690px");
      if (escondido.classList.contains('mostrar')) {
        escondido.classList.remove('mostrar');
        botao.innerText = 'Ver mais';
        container.style.height = '750px'; // Define altura para 750px quando normal
        console.log("Escondido. Altura 750px");
      } else {
        escondido.classList.add('mostrar');
        botao.innerText = 'Ver menos';
        container.style.height = '1200px'; // Define altura para 1200px quando expandido
        console.log("Mostrando. Altura 1200px");
      }
    } else {
      console.log("Tamanho de tela > 690px");
      if (escondido.classList.contains('mostrar')) {
        escondido.classList.remove('mostrar');
        botao.innerText = 'Ver mais';
        container.style.height = '600px'; // Altura normal para telas maiores
        console.log("Escondido. Altura 600px");
      } else {
        escondido.classList.add('mostrar');
        botao.innerText = 'Ver menos';
        container.style.height = '900px'; // Altura expandida para telas maiores
        console.log("Mostrando. Altura 900px");
      }
    }
  }

  // Adiciona evento de resize para verificar a largura da tela ao redimensionar
  window.addEventListener('resize', () => {
    console.log('Redimensionamento detectado, largura da tela: ' + window.innerWidth);
  });