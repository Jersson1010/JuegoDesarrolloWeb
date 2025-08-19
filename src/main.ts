type Option = 'piedra' | 'papel' | 'tijera' | 'lagarto' | 'spock';
let playerWins = 0;
let computerWins = 0;

console.log('¡Bienvenido al juego Piedra, Papel, Tijera, Lagarto, Spock!');

const gameRules: Record<Option, Option[]> = {
  piedra: ['tijera', 'lagarto'],
  papel: ['piedra', 'spock'],
  tijera: ['papel', 'lagarto'],
  lagarto: ['spock', 'papel'],
  spock: ['tijera', 'piedra'],
};

const options: Option[] = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
const emojis: Record<Option, string> = {
  piedra: '🪨',
  papel: '📄',
  tijera: '✂️',
  lagarto: '🦎',
  spock: '🖖',
};

function getRandomOption(): Option {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

function determineWinner(player: Option, computer: Option): string {
  if (player === computer) return 'Empate 🤝';
  if (gameRules[player].includes(computer)) return '¡Ganaste! 🎉';
  return 'Perdiste... 😢';
}

// Función para manejar clics
function handleChoice(playerChoice: Option) {
  const computerChoice = getRandomOption();

  const playerDiv = document.getElementById('player-choice');
  const computerDiv = document.getElementById('computer-choice');
  const winnerDiv = document.getElementById('winner');
  const playerScoreDiv = document.getElementById('player-score');
  const computerScoreDiv = document.getElementById('computer-score');

  // Mostrar elección del jugador
  if (playerDiv) {
    playerDiv.textContent = `Jugador: ${emojis[playerChoice]} ${capitalize(playerChoice)}`;
  }

  // Animación "pensando..."
  let dotCount = 0;
  let loadingInterval: number;

  if (computerDiv) {
    loadingInterval = window.setInterval(() => {
      const dots = '.'.repeat(dotCount % 5);
      computerDiv.textContent = `Computadora: 🤔 ${dots}`;
      dotCount++;
    }, 300);
  }

  setTimeout(() => {
    clearInterval(loadingInterval);
    const result = determineWinner(playerChoice, computerChoice);

    if (computerDiv) {
      computerDiv.textContent = `Computadora: ${emojis[computerChoice]} ${capitalize(computerChoice)}`;
    }

    if (winnerDiv) {
      winnerDiv.textContent = `Resultado: ${result}`;
    }

    // Actualizar marcador
    if (result.includes('Ganaste')) {
      playerWins++;
    } else if (result.includes('Perdiste')) {
      computerWins++;
    }

    if (playerScoreDiv) playerScoreDiv.textContent = `Jugador 🧑: ${playerWins}`;
    if (computerScoreDiv) computerScoreDiv.textContent = `Computadora 🤖: ${computerWins}`;
  }, 1200);
}

const resetButton = document.getElementById('reset-button');
if (resetButton) {
  resetButton.addEventListener('click', () => {
    playerWins = 0;
    computerWins = 0;

    const playerScoreDiv = document.getElementById('player-score');
    const computerScoreDiv = document.getElementById('computer-score');
    const playerDiv = document.getElementById('player-choice');
    const computerDiv = document.getElementById('computer-choice');
    const winnerDiv = document.getElementById('winner');

    if (playerScoreDiv) playerScoreDiv.textContent = 'Jugador 🧑: 0';
    if (computerScoreDiv) computerScoreDiv.textContent = 'Computadora 🤖: 0';
    if (playerDiv) playerDiv.textContent = 'Jugador: -';
    if (computerDiv) computerDiv.textContent = 'Computadora: -';
    if (winnerDiv) winnerDiv.textContent = 'Resultado: -';
  });
}


// Añadir eventos a cada div con clase "option"
const optionDivs = document.querySelectorAll('.option');
optionDivs.forEach((div) => {
  div.addEventListener('click', () => {
    const choice = div.getAttribute('data-choice') as Option;
    if (options.includes(choice)) {
      handleChoice(choice);
    }
  });
});

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

