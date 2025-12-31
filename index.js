const cardArray = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍓", "🍓", "🍒", "🍒", "🥝", "🥝"];
const gameBoard = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

let suffledCard = cardArray.sort(() => 0.5 - Math.random());
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

suffledCard.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "";
    card.dataset.value = symbol;
    gameBoard.appendChild(card);

    card.addEventListener("click", () => {
        if (lockBoard || card === firstCard) return;

        card.textContent = symbol;

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            lockBoard = true;

            if (firstCard.dataset.value === secondCard.dataset.value) {
                matches++;
                resetTurn();
            } else {
                setTimeout(() => {
                    firstCard.textContent = "";
                    secondCard.textContent = "";
                    resetTurn();
                }, 800);
            }
        }

        if (matches === cardArray.length / 2) {
            statusText.textContent = "You win🥇"
        }
    });
});

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}