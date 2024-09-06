const symbols = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];
const reels = document.querySelectorAll('.reel');
const spinButton = document.getElementById('spin-button');
const resultDisplay = document.getElementById('result');

function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
    spinButton.disabled = true;
    resultDisplay.textContent = '';

    const reelPromises = Array.from(reels).map((reel, index) => {
        return new Promise(resolve => {
            const intervalId = setInterval(() => {
                reel.textContent = getRandomSymbol();
            }, 100);

            setTimeout(() => {
                clearInterval(intervalId);
                resolve();
            }, (index + 1) * 1000);
        });
    });

    Promise.all(reelPromises).then(() => {
        spinButton.disabled = false;
        checkResult();
    });
}

function checkResult() {
    const symbols = Array.from(reels).map(reel => reel.textContent);
    if (symbols.every(symbol => symbol === symbols[0])) {
        resultDisplay.textContent = '恭喜你贏了!';
    } else {
        resultDisplay.textContent = '再試一次!';
    }
}

spinButton.addEventListener('click', spin);
