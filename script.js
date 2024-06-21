let players = [];
let deck = [];
let currentPlayerIndex = 0;
let roundNumber = 1;
let previousCard = null;
let currentRule = "";
let rulesHistory = [];

const cardTypes = ['1 Trink', '2 gib ein Trink', '3 krasser Reim', '4 Kumpel', '5 Ich hab noch nie', '6 Hölle', '7 Himmel', '8 Kategorie', '9 Ich hab schon mal', '10 Frage Runde', 'Bube alle Herren Trinken', 'Dame alle Damen Trinken', 'König Fragemeister', 'Ass Wasserfall', 'Joker alle Trinken außer man Selbst'];

function setupPlayers() {
    const numPlayers = document.getElementById('numPlayers').value;
    const playerNamesDiv = document.getElementById('playerNames');
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';
    players = [];

    for (let i = 0; i < numPlayers; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Name für Spieler ${i + 1}`;
        playersContainer.appendChild(input);
        players.push(input);
    }

    playerNamesDiv.classList.remove('hidden');
}

function startGame() {
    players = players.map(input => input.value.trim()).filter(name => name);
    if (players.length === 0) {
        alert("Bitte geben Sie gültige Namen ein.");
        return;
    }
    deck = cardTypes.concat(cardTypes, cardTypes, cardTypes);
    shuffleDeck();
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('currentPlayer').innerText = `Spieler: ${players[currentPlayerIndex]} ist am Zug.`;
    setInitialRule();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    if (deck.length === 0) {
        alert("Das Deck ist leer.");
        return;
    }

    const card = deck.pop();
    document.getElementById('drawnCard').innerText = `${players[currentPlayerIndex]} hat eine ${card} gezogen.`;

    if (previousCard === card) {
        alert(`${players[currentPlayerIndex]}, du hast die gleiche Karte (${card}) innerhalb von 3 Zügen zweimal gezogen! Trinke einen Schluck Wasser.`);
        deck.unshift(card);
        shuffleDeck();
        return drawCard();
    }

    previousCard = card;

    if (card === 'Joker') {
        handleJoker();
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) {
        roundNumber++;
        document.getElementById('round').innerText = `Runde ${roundNumber}`;
        rulesHistory.push(currentRule);
        currentRule = ""; // Clear current rule for the next round
        setInitialRule();
    }

    document.getElementById('currentPlayer').innerText = `Spieler: ${players[currentPlayerIndex]} ist am Zug.`;
}

function handleJoker() {
    const jokerHolder = players[Math.floor(Math.random() * players.length)];
    alert(`Joker wurde gezogen von ${jokerHolder}.`);
}

function setInitialRule() {
    const ruleCreator = players[Math.floor(Math.random() * players.length)];
    currentRule = prompt(`${ruleCreator}, denk dir eine Regel aus:`);
    document.getElementById('currentRule').innerText = `Regel von ${ruleCreator}: ${currentRule}`;
}
