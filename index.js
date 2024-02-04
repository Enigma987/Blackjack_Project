var ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];

var suits = ["Club", "Diamond", "Heart", "Spade"];

var cards = [];
var leftCardOnDeck = [];
var playerHand = [];
var croupierHand = [];

var playerValue = 0;
var croupierValue = 0;

var playerPoints = 0;
var croupierPoints = 0;

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
$(".hit").attr("disabled", true);
$(".pass").attr("disabled", true);
$(".newTurn").attr("disabled", true);




function randomCard() {
    if (leftCardOnDeck.length != 0) {
        var randomNumber = Math.floor(Math.random() * leftCardOnDeck.length);

        var card = leftCardOnDeck[randomNumber];

        leftCardOnDeck = leftCardOnDeck.filter(function (cardToRemove) {
            return cardToRemove !== card;
        })

        return card;
    } else {
        $(".hit").attr("disabled", true);
        $(".pass").attr("disabled", true);
        $(".newTurn").attr("disabled", true);
        $(".result").text("There is no left cards in the deck. Start new game");
    }
    
}

$(".hit").click(function () {
    var playerCard = randomCard();
    playerValue += playerCard.value;
    playerHand.push(playerCard);

    $(".playerPoints").text(playerValue);

    $('.playerCards').append($("<img class='card' src=" + playerCard.pic + "></p>"));

    if (playerValue === 21) {
        $(".result").text("Hurra, Blackjack!!!");
        playerPoints++;
        $(".playerPointsAll").text(playerPoints);

        $(".hit").attr("disabled", true);
        $(".pass").attr("disabled", true);

        $(".newTurn").attr("disabled", false);
    } else if (playerValue > 21) {
        $(".result").text("Sorry you lose you have above 21 points :(");
        croupierPoints++;
        $(".croupierPointsAll").text(croupierPoints);

        $(".hit").attr("disabled", true);
        $(".pass").attr("disabled", true);
        $(".newTurn").attr("disabled", false);
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
        $(".result").text("Sorry you lose - croupier win :(");
        croupierPoints++;
        $(".croupierPointsAll").text(croupierPoints);
        $(".newTurn").attr("disabled", false);

    } else if (croupierValue > 21) {
        $(".result").text("You win :)");
        playerPoints++;
        $(".playerPointsAll").text(playerPoints);
        $(".newTurn").attr("disabled", false);
    }
}

$(".pass").click(function () {
    $(".hit").attr("disabled", true);
    $(this).attr("disabled", true);
    

    croupierTurn();
})

$(".newGame").click(function () {
    $(".result").text("Game on");
    playerValue = 0;
    $(".playerPoints").text(playerValue);

    croupierValue = 0;
    $(".croupierPoints").text(croupierValue);

    playerPoints = 0;
    $(".playerPointsAll").text(playerPoints);

    croupierPoints = 0;
    $(".croupierPointsAll").text(croupierPoints);

    leftCardOnDeck = cards;
    playerHand = [];
    croupierHand = [];

    document.querySelectorAll(".card").forEach(e => e.remove());

    $(".hit").attr("disabled", false);
    $(".pass").attr("disabled", false);

    var playerCard = randomCard();
    playerValue += playerCard.value;
    playerHand.push(playerCard);

    $(".playerPoints").text(playerValue);

    $('.playerCards').append($("<img class='card' src=" + playerCard.pic + "></p>"));
})

$(".newTurn").click(function () {
    $(".result").text("Game on");
    playerValue = 0;
    $(".playerPoints").text(playerValue);

    croupierValue = 0;
    $(".croupierPoints").text(croupierValue);

    playerHand = [];
    croupierHand = [];

    document.querySelectorAll(".card").forEach(e => e.remove());

    $(".hit").attr("disabled", false);
    $(".pass").attr("disabled", false);

    var playerCard = randomCard();
    playerValue += playerCard.value;
    playerHand.push(playerCard);

    $(".playerPoints").text(playerValue);

    $('.playerCards').append($("<img class='card' src=" + playerCard.pic + "></p>"));
})



