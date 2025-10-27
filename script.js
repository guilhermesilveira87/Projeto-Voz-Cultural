/* ============================================================
   VOZ CULTURAL - SCRIPT 2.0
   Autor: Projeto de Extensão Anhanguera
   Atualizado: Outubro/2025
   ============================================================ */

// 🌐 ROLAGEM SUAVE ENTRE SEÇÕES
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ⬆️ BOTÃO DE VOLTAR AO TOPO
const btnTopo = document.createElement('button');
btnTopo.id = "btnTopo";
btnTopo.textContent = "⬆️";
document.body.appendChild(btnTopo);

window.addEventListener('scroll', () => {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 🌙 MODO ESCURO / CLARO
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoEscuro', document.body.classList.contains('dark-mode'));
    darkToggle.innerHTML = document.body.classList.contains('dark-mode')
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });

  // Persistência entre sessões
  if (localStorage.getItem('modoEscuro') === 'true') {
    document.body.classList.add('dark-mode');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

// 📅 EVENTOS - ABRIR DETALHES (MODAL SIMPLES)
const eventos = document.querySelectorAll('.evento');
eventos.forEach(evento => {
  evento.addEventListener('click', () => {
    const tituloEl = evento.querySelector('h4');
    const titulo = tituloEl ? tituloEl.textContent.trim() : '';

    // seleção mais robusta da descrição: pega o último <p> dentro do card
    let descricao = '';
    const ps = evento.querySelectorAll('p');
    if (ps.length) {
      descricao = ps[ps.length - 1].textContent.trim();
    } else {
      // tentativa alternativa dentro de .evento-content
      const container = evento.querySelector('.evento-content');
      if (container) {
        const ps2 = container.querySelectorAll('p');
        if (ps2.length) descricao = ps2[ps2.length - 1].textContent.trim();
      }
    }

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <h3>${titulo}</h3>
        <p>${descricao}</p>
        <button id="fecharModal">Fechar</button>
      </div>
    `;
    document.body.appendChild(modal);

    const fechar = document.getElementById('fecharModal');
    fechar.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.remove();
    });
  });
});

// 🎨 ESTILIZAÇÃO DO MODAL VIA JS
const modalStyle = document.createElement('style');
modalStyle.textContent = `
  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .modal-content {
    background: white;
    color: var(--texto-escuro, #333); /* corrigido: força cor escura dentro do modal */
    padding: 25px;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    animation: fadeIn 0.3s ease;
  }
  #fecharModal {
    margin-top: 20px;
    padding: 8px 16px;
    border: none;
    background: #1d976c;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
  }
  #fecharModal:hover {
    background: #13865a;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(modalStyle);

// 🔁 FUTURO: CARREGAMENTO DINÂMICO DE EVENTOS
// Exemplo base (comentado para uso posterior):
/*
fetch('eventos.json')
  .then(res => res.json())
  .then(eventos => {
    const container = document.querySelector('.eventos');
    container.innerHTML = '';
    eventos.forEach(e => {
      const card = document.createElement('article');
      card.classList.add('evento');
      card.innerHTML = `
        <img src="${e.imagem}" alt="${e.titulo}">
        <div class="evento-content">
          <h4>${e.titulo}</h4>
          <p>${e.data} | ${e.local}</p>
          <p>${e.descricao}</p>
        </div>
      `;
      container.appendChild(card);
    });
  });
*/

// Lazy loading de imagens
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

