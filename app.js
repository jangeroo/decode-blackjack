// app state
// ===================
// These variables represent the state of our application, they tell us at
// any given moment the state of our blackjack game. You might find it useful
// to use these to debug issues by console logging them in the functions below.
var deckID = "";
var dealerCards = [];
var playerCards = [];
var playerScore = 0;
var dealerScore = 0;
var roundLost = false;
var roundWon = false;
var roundTied = false;


// game play nodes:
// ===================
// These nodes will be used often to update the UI of the game.

// assign this variable to the DOM node which has id="dealer-number"
var dealerScoreNode = $('#dealer-number')

// select the DOM node which has id="player-number"
var playerScoreNode = $('#player-number')

// select the DOM node which has id="dealer-cards"
var dealerCardsNode = $('#dealer-cards')

// select the DOM node which has id="player-cards"
var playerCardsNode = $('#player-cards')

// selec the DOM node which has id="announcement"
var announcementNode = $('#announcement')

// selec the DOM node which has id=new-game"
var newDeckNode = $('#new-game')

// selec the DOM node which has id="next-hand"
var nextHandNode = $('#next-hand')

// selec the DOM node which has id=""hit-me""
var hitMeNode = $('#hit-me')

// selec the DOM node which has id="stay"
var stayNode = $('#stay')


// On click events
// ==================
// These events define the actions to occur when a button is clicked.
// These are provided for you and serve as examples for creating further
// possible actions of your own choosing.
newDeckNode.click(getNewDeck);
nextHandNode.click(newHand);
hitMeNode.click(() => hitMe('player'));
stayNode.click(() => setTimeout(() => dealerPlays(), 600));
// ==================


// Game mechanics functions
// ========================


function getNewDeck() {
    console.log('*** getting new deck...')
    //   This function needs to:
    //   1) Call the resetPlayingArea function
    resetPlayingArea()
    //   2) Make a call to deckofcardsapi in order to retrieve a new deck_id
    $.getJSON('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(data => {
        console.log(data)
    //   3) Set the value of our state variable deckID to the retrieved deck_id
        deckID = data.deck_id
    //   4) Change the display property of style on the nextHandNode element in order
    //   to provide the player with the Next Hand button.
        nextHandNode.css('display', 'initial')
    //   5) Hide the hit-me and stay buttons by changing their style.display to "none"
        hitMeNode.css('display', 'none')
        stayNode.css('display', 'none')
    })
    //   6) Catch any errors that may occur on the fetch and log them
    .catch(error => console.log(error))
}

function computeScore(cards) {
  // This function receives an array of cards and returns the total score.
  // ...
  var score = 21
  return score
}


function newHand() {
    console.log('*** new hand (NOT FULLY IMPLEMENTED)')
    //   This function needs to:
    //   1) Call the resetPlayingArea function
    resetPlayingArea()
    //   2) Make a call to deckofcardsapi using the deckID state variale in order
    //   to retrieve draw 4 cards from the deck.
    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
    //   3) Once 4 cards have been drawn, push 2 of them to our dealerCards state
    //   array and 2 to our playerCards state array.
    .then(data => {
        dealerCards.push(data.cards.pop())
        dealerCards.push(data.cards.pop())
        playerCards.push(data.cards.pop())
        playerCards.push(data.cards.pop())
        console.log(dealerCards)
        console.log(playerCards)
        //   4) Set our dealerScore state variable to "?" and then set the textContent
        //   value of the dealerScoreNode to dealerScore;
        dealerScore = "?"
        dealerScoreNode.text(dealerScore)
        //   5) ForEach card in playerCards and dealerCards, create an <img> element
        //   and assign the src of these to their respective card images. Don't forget to
        //   append these newly created <img> elements to the respective #dealer-cards and
        //   #player-cards DOM elements in order to have them show up in the html.
        playerCards.forEach(card => {
            var img = $('<img/>', {'src': card.image})
            playerCardsNode.append(img)
        })
        dealerCards.forEach(card => {
            var img = $('<img/>', {'src': card.image})
            dealerCardsNode.append(img)
        })
        //   6) Finally, compute the player's score by calling computeScore() and update
        //   the playerScoreNode to reflect this.
        playerScore = computeScore(playerCards)
        playerScoreNode.text(playerScore)
        //   7) If player score is 21, announce immediate victory by setting:
        //   roundWon = true;
        //   announcementNode.textContent = "BlackJack! You Win!";
        if (playerScore == 21) {
            roundWon = true
            announcementNode.text('BlackJack! You Win!')
        }
    })
    //   8) catch and log possible error from the fetch.
    .catch(error => console.log(error))    
}


function resetPlayingArea() {
    console.log('*** resetting playing area... (NOT FULLY IMPLEMENTED)')
    //   This function needs to:
    //   1) Reset all state variables to their defaults
    var deckID = "";
    var dealerCards = [];
    var playerCards = [];
    var playerScore = 0;
    var dealerScore = 0;
    var roundLost = false;
    var roundWon = false;
    var roundTied = false;
    //   2) Reset the gameplay UI by updating textContent of all Nodes which may
    //   be displaying data from a previous round in the game. (ex: dealerScoreNode)
    //   3) Remove all <img> elements inside dealerCardsNode and playerCardsNode.
  
}


function hitMe(target) {
    console.log('*** hit me (NOT FULLY IMPLEMENTED)')
    //   This function needs to:
    //   1) If any of roundLost or roundWon or roundTied is true, return immediately.
    if (roundLost || roundWon || roundTied) return
    //   2) Using the same deckID, fetch to draw 1 card
    $.getJSON(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    //   3) Depending on wether target is 'player' or 'dealer', push the card to the
    //   appropriate state array (playerCards or dealerCards).
    //   4) Create an <img> and set it's src to the card image and append it to the
    //   appropriate DOM element for it to appear on the game play UI.
    .then(data => {
        var card = data.cards.pop()
        var img = $('<img/>', {'src': card.image})
        
        if (target == 'player') {
            playerCards.push(card)
            playerCards.append(img)
            //   5) If target === 'player', compute score and immediately announce loss if
            //   score > 21 by setting:
            //   roundLost = true;
            //   and updating announcementNode to display a message delivering the bad news.
            playerScore = computeScore(playerCards)
            playerScoreNode.text(playerScore)
            if (playerScore == 21) {
                roundWon = true
                announcementNode.text('BlackJack! You Win!')
            }
        } else {
            dealerCards.push(card)
            dealerCardsNode.append(img)
            //   6) If target === 'dealer', just call the dealerPlays() function immediately
            //   after having appended the <img> to the game play UI.
            dealerPlays()
        }
    })
    //   7) Catch error and log....
    .catch(error => console.log(error))    
}

function dealerPlays() {
    //   This function needs to:
    //   1) If any of roundLost or roundWon or roundTied is true, return immediately.
    //   2) Compute the dealer's score by calling the computeScore() function and
    //   update the UI to reflect this.


    if (dealerScore < 17) {
        // a delay here makes for nicer game play because of suspence.
        setTimeout(()=>hitMe('dealer'), 900)
    }
    else if (dealerScore > 21) {
        roundWon = true;
        // ... Update the UI to reflect this...
    }
    else if (dealerScore > playerScore) {
        roundLost = true;
        // ... Update the UI to reflect this...
    }
    else if (dealerScore === playerScore) {
        roundTied = true;
        // ... Update the UI to reflect this...
    }
    else {
        roundWon = true;
        // ... Update the UI to reflect this...
    }

}
