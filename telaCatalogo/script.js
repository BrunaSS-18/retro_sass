document.addEventListener('DOMContentLoaded', () => {
  const containerCards = document.querySelector('.cardProd');
  const botoesFiltro = document.querySelectorAll('.filtros button');
  let jogosData = [];

  fetch('../db.json')
    .then(response => response.json())
    .then(data => {
      jogosData = data.jogos;
      renderizarJogos(jogosData);
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));

  function renderizarJogos(lista) {
    containerCards.innerHTML = '';

    lista.forEach(jogo => {
      const card = document.createElement('div');
      card.classList.add('card-item');

      card.innerHTML = `
        <div class="img-box">
          <img src="${jogo.imagem}" alt="${jogo.nome}">
        </div>
        <div class="info-box">
          <h3>${jogo.nome}</h3>
          <button class="btn-carrinho">
            <img src="../imagens/carrinho.png" alt="Carrinho">
          </button>
        </div>
      `;

      const btnCarrinho = card.querySelector('.btn-carrinho');

      btnCarrinho.addEventListener('click', () => {
        adicionarAoCarrinho(btnCarrinho, jogo.nome);
      });

      containerCards.appendChild(card);
    });
  }

  botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
      const categoria = botao.textContent.trim();

      if (botao.classList.contains('active')) {
        botao.classList.remove('active');
        renderizarJogos(jogosData);
        return;
      }

      botoesFiltro.forEach(btn => btn.classList.remove('active'));
      botao.classList.add('active');

      const jogosFiltrados = jogosData.filter(jogo => 
        jogo.categoria.toLowerCase() === categoria.toLowerCase()
      );

      renderizarJogos(jogosFiltrados);
    });
  });
});

function adicionarAoCarrinho(botao, nomeJogo) {
  alert(`"${nomeJogo}" foi adicionado ao carrinho com sucesso!`);

  botao.classList.add('adicionado');

  setTimeout(() => {
    botao.classList.remove('adicionado');
  }, 1500);
}