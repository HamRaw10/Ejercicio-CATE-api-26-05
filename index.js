<<<<<<< HEAD
=======
function obtenerFrases(callback) {
  let frases = [];
  let promesas = [];

  for (let i = 0; i < 5; i++) {
    let promesa = fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
      .then(res => res.json())
      .then(data => {
        frases.push(data[0]);
      });
    promesas.push(promesa);
  }

  Promise.all(promesas).then(() => callback(frases));
}

function crearElementoFrase(frase, index) {
  let div = document.createElement('div');
  div.className = 'draggable frase';
  div.textContent = frase.quote;
  div.setAttribute('draggable', 'true');
  div.setAttribute('data-id', index);
  div.setAttribute('data-tipo', 'frase');
  return div;
}

function crearElementoPersonaje(frase, index) {
  let div = document.createElement('div');
  div.className = 'draggable personaje';
  div.setAttribute('draggable', 'true');
  div.setAttribute('data-id', index);
  div.setAttribute('data-tipo', 'personaje');

  let img = document.createElement('img');
  img.src = frase.image;
  img.alt = frase.character;
  img.style.width = '100px';

  div.appendChild(img);
  return div;
}

function iniciarJuego() {
  const frasesCont = document.getElementById('frases');
  const personajesCont = document.getElementById('personajes');
  const casillas = document.querySelectorAll('.casilla');
  const puntajeFinal = document.getElementById('puntaje-final');
  const comprobarBtn = document.getElementById('comprobar');

  obtenerFrases(frases => {
    for (let i = 0; i < frases.length; i++) {
      frasesCont.appendChild(crearElementoFrase(frases[i], i));
      personajesCont.appendChild(crearElementoPersonaje(frases[i], i));
    }

    document.addEventListener('dragstart', e => {
      if (e.target.classList.contains('draggable')) {
        const id = e.target.getAttribute('data-id');
        const tipo = e.target.getAttribute('data-tipo');
        e.dataTransfer.setData('text/plain', JSON.stringify({ id, tipo }));
      }
    });

    casillas.forEach(casilla => {
      casilla.addEventListener('dragover', e => e.preventDefault());

      casilla.addEventListener('drop', e => {
        e.preventDefault();
        const { id, tipo } = JSON.parse(e.dataTransfer.getData('text/plain'));

        const tipoExistente = casilla.querySelector(`.draggable[data-tipo="${tipo}"]`);
        const total = casilla.querySelectorAll('.draggable').length;

        if (!tipoExistente && total < 2) {
          const elemento = document.querySelector(`.draggable[data-id="${id}"][data-tipo="${tipo}"]`);
          if (elemento) casilla.appendChild(elemento);
        }
      });
    });

    comprobarBtn.addEventListener('click', () => {
      let puntaje = 0;

      casillas.forEach(casilla => {
        const hijos = casilla.querySelectorAll('.draggable');
        if (hijos.length === 2) {
          const id1 = hijos[0].getAttribute('data-id');
          const id2 = hijos[1].getAttribute('data-id');
          if (id1 === id2) {
            puntaje++;
            casilla.classList.add('correcto');
          } else {
            casilla.classList.add('incorrecto');
          }
        } else {
          casilla.classList.add('incorrecto');
        }
      });

      puntajeFinal.textContent = 'Puntaje final: ' + puntaje + ' / 5';
      comprobarBtn.disabled = true;
    });
  });
}

iniciarJuego();
>>>>>>> 45b1045 (xdd)
