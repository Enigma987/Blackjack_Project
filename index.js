var ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

var suits = ["club", "diamond", "heart", "spade"];

var cards = [];
var leftCardOnDeck = [];
var playerHand = [];
var croupierHand = [];

var playerValue = 0;
var croupierValue = 0;

function blackjackValues(rank) {
    switch (rank) {
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        case "Ace":
            return 11;
        default:
            return 10;
    }
        
}

function choosePosition(pos) {
    switch (pos) {
        case 0:
            return "zero";
        case 1:
            return "one";
        case 2:
            return "two";
        case 3:
            return "three";
        case 4:
            return "four";
    }
}

function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = blackjackValues(rank);
    this.name = rank + " - " + suit;
}

function loadAllDeck() {
    for (var i = 0; i < ranks.length; i++)
        for (var j = 0; j < suits.length; j++)
            cards.push(new Card(ranks[i], suits[j]));
}

loadAllDeck();
leftCardOnDeck = cards;
console.log(cards);

function randomCard() {
    var randomNumber = Math.floor(Math.random() * leftCardOnDeck.length);

    var card = leftCardOnDeck[randomNumber];

    leftCardOnDeck = leftCardOnDeck.filter(function (cardToRemove) {
        return cardToRemove !== card;
    })

    return card;
}

function playerTurn() {
    var playerCard = randomCard();
    playerValue += playerCard.value;
    playerHand.push(playerCard);

    console.log(playerHand[playerHand.length - 1]);
    console.log(choosePosition(playerHand.length - 1));
    $("." + choosePosition(playerHand.length-1)).text(playerCard.name);
    $(".playerPoints").text(playerValue);

    $('.playerCards').append($('<p class="card"></p>').text(playerCard.name));
}

function croupierTurn() {
    var croupierCard = randomCard();
    croupierValue += croupierCard.value;
    croupierHand.push(croupierCard);

    $(".croupierPoints").text(croupierValue);
}



function mainGameLoop() {
    console.log(leftCardOnDeck);
    console.log(playerHand + " Value: " + playerValue);
    console.log(croupierHand + " Value: " + croupierValue);


}

$(".hit").click(function () {
    playerTurn();

    //mainGameLoop();
});



