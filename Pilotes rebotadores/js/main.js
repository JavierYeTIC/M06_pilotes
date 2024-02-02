// Importa la clase Pilota des del fitxer pilota.js
import { Pilota } from './pilota.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

const pilotes = [];

function loop() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const pilota of pilotes) {
        pilota.dibuixa(ctx);
        pilota.mou(canvas.width, canvas.height);
    }

    const distanciaMinima = 2; // ajusta según sea necesario

    for (let i = 0; i < pilotes.length; i++) {
        for (let j = i + 1; j < pilotes.length; j++) {
            if (colisioEntrePilotes(pilotes[i], pilotes[j], distanciaMinima)) {
                pilotes[i].color = randomRGB();
                pilotes[j].color = randomRGB();
                // Intercambiamos las velocidades para simular un rebote
                const tempVelX = pilotes[i].velX;
                const tempVelY = pilotes[i].velY;
                pilotes[i].velX = pilotes[j].velX;
                pilotes[i].velY = pilotes[j].velY;
                pilotes[j].velX = tempVelX;
                pilotes[j].velY = tempVelY;
            }
        }
    }
    requestAnimationFrame(loop);
    
}

function colisioEntrePilotes(pilota1, pilota2, distanciaMinima) {
  const distX = pilota1.x - pilota2.x;
  const distY = pilota1.y - pilota2.y;
  const distancia = Math.sqrt(distX * distX + distY * distY);

  return distancia <= pilota1.mida + pilota2.mida + distanciaMinima;
}


// Crea una función para inicializar las pelotas
function initPilotes(numPelotas) {
    for (let i = 0; i < numPelotas; i++) {
        const mida = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
        const x = Math.random() * (canvas.width - mida * 2) + mida;
        const y = Math.random() * (canvas.height - mida * 2) + mida;
        const velX = (Math.random() - 0.5) * 14; // Velocidad aleatoria entre -7 y 7
        const velY = (Math.random() - 0.5) * 14; // Velocidad aleatoria entre -7 y 7

        const pilota = new Pilota(x, y, velX, velY, randomRGB(), mida);
        pilotes.push(pilota);
    }
}

// Inicia el bucle
initPilotes(25);
requestAnimationFrame(loop);