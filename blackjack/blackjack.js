

let dealerSum = 0;
let player1Sum = 0;

let dealerAceCount = 0;
let player1AceCount = 0;

let hidden;
let deck;

let canHit = true; // allows the player (you) to draw while playerSum <= 21

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}



function buildDeck(){
    let rank = ["A", "2", "3", "4","5","6","7","8","9", "10", "J", "Q", "K"];
    let suit = ["C", "D", "H","S"];
    deck = [];

    for (let i = 0; i < suit.length; i++){
        for (let j = 0; j < rank.length; j++){
            deck.push(rank[j] + "-" + suit[i]);   // A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);          // deck should be logged to console within statement of function buildDeck
}
//console.log(deck);   // Remember that because of scope this will return as undefined in the console






function shuffleDeck(){          // Randomization of deck with for-loop and Math.random method     
    for (let i = 0; i < deck.length; i++) {               // Random number between (0-1) * 52 => (0-51.999)
        let j = Math.floor(Math.random() * deck.length);    // multiplied by 52 for accurate distribution of randomization
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck);
}

// console.log(deck);
// console.log(shuffleDeck);




function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
            // console.log(hidden);
            // console.log(dealerSum); 

    while (dealerSum < 17) {     // create while loop to repeatedly evaluate if the dealer should "hit" for a new card
            // <img>                 // 
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            document.getElementById("dealer-cards").append(cardImg);
    }
console.log(dealerSum);


     for (let i = 0; i < 2; i++) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "./cards/" + card + ".png";
            player1Sum += getValue(card);
            player1AceCount += checkAce(card);
            document.getElementById("player-cards").append(cardImg);

}
    console.log(player1Sum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}



function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    player1Sum += getValue(card);
    player1AceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if(reduceAce(player1Sum, player1AceCount) > 21) {    // A, J, 8 -> 1 +10 + 8
            canHit = false;
    }
}


function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    player1Sum = reduceAce(player1Sum, player1AceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + 
".png";

    let message = "";
    if (player1Sum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    // if both you and dealer <= 21 (after you've clicked stay)
    else if (player1Sum == dealerSum) {
        message = "Tie!";
    } 
    else if (player1Sum > dealerSum) {
        message = "You Win!";
    }
    else if (player1Sum < dealerSum) {
        message = "You Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("player-sum").innerText = player1Sum;
    document.getElementById("results").innerText = message;
}



function getValue(card){
    let data = card.split("-"); // "4-C"  -> ["4", "C"]
    let value = data[0];
    
    if (isNaN(value)) {  //A J Q K              // if value is of type Not a Number
        if (value == "A") {                         // But is of letter type A
            return 11;                                  // Assign value of 11
        }
        return 10;                                      // Otherwise, assign value of 10
    }
    return parseInt(value);
}


function checkAce(card) {
    if(card[0] == "A" ) {
        return 1; 
    }
        return 0;
}


function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

