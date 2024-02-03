var ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

var suits = ["Club", "Diamond", "Heart", "Spade"];

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

function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.value = blackjackValues(rank);
    this.name = rank + "_" + suit;
    this.pic = (new Image()).src = "./images/" + this.name + ".png";
}

function loadAllDeck() {
    for (var i = 0; i < ranks.length; i++)
        for (var j = 0; j < suits.length; j++)
            cards.push(new Card(ranks[i], suits[j]));
}

loadAllDeck();
leftCardOnDeck = cards;

function randomCard() {
    var randomNumber = Math.floor(Math.random() * leftCardOnDeck.length);

    var card = leftCardOnDeck[randomNumber];

    leftCardOnDeck = leftCardOnDeck.filter(function (cardToRemove) {
        return cardToRemove !== card;
    })

    return card;
}

$(".hit").click(function () {
    var playerCard = randomCard();
    playerValue += playerCard.value;
    playerHand.push(playerCard);

    $(".playerPoints").text(playerValue);

    $('.playerCards').append($("<img class='card' src=" + playerCard.pic + "></p>"));

    if (playerValue === 21) {
        $("h2").text("Hurra, Blackjack!!!");

        $(".hit").attr("disabled", true);
        $(".pass").attr("disabled", true);
    } else if (playerValue > 21) {
        $("h2").text("Sorry you lose you have above 21 points :(");

        $(".hit").attr("disabled", true);
        $(".pass").attr("disabled", true);
    }
});

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function croupierTurn() {
    var croupierCard;
    while (croupierValue <= playerValue && croupierValue <= 21) {
        croupierCard = randomCard();

        croupierValue += croupierCard.value;
        croupierHand.push(croupierCard);

        $(".croupierPoints").text(croupierValue);

        $('.croupierCards').append($("<img class='card' src=" + croupierCard.pic + "></p>"));

        await this.timeout(Math.random() * 100 + 500);
    }

    if (croupierValue > playerValue && croupierValue <= 21) {
        $("h2").text("Sorry you lose - croupier win :(");
    } else if (croupierValue > 21) {
        $("h2").text("You win :)");
    }
}



$(".pass").click(function () {
    $(".hit").attr("disabled", true);
    $(this).attr("disabled", true);

    croupierTurn();
})



