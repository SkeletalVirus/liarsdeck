const deck = []
let table = ''
let lastPlayed = {
    player: '',
    card: ''
}

const handDisplay = document.getElementsByClassName('currentHand')

function player(name) {
    this.name = name
    this.chambers = 6
    this.hand = []
}

function initiateDeck() {
    for(let i = 0; i < 6; i++) {
        deck.push('king')
        deck.push('queen')
        deck.push('jack')
    }
    deck.push('wild', 'wild')
}

function giveHand(player) {
    for(let i = 0; i < 5; i++) {
        randNum = Math.floor(Math.random() * deck.length)
        player.hand.push(deck[randNum])
        deck.splice(randNum, 1)
    }
}

function playCards(player, card) {
    lastPlayed.player = player.name
    lastPlayed.card = player.hand[card]
    player.hand.splice(card, 1)

    console.log(lastPlayed)
    console.log(player.hand)
}

initiateDeck()

let players = ['P1', 'P2', 'P3', 'P4']

if (players.length <= 4) {
    for(let i = 0; i < players.length; i++) {
        switch(i) {
            case 0:
                player1 = new player(players[i])
                giveHand(player1)
                break
            case 1:
                player2 = new player(players[i])
                giveHand(player2)
                break
            case 2:
                player3 = new player(players[i])
                giveHand(player3)
                break
            case 3:
                player4 = new player(players[i])
                giveHand(player4)
                break
        }

    }
}
else {
    console.log('Too Many Players')
}

for(let i = 0; i < player1.hand.length; i++) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.classList.add('p1')
    card.setAttribute('id', i)
    card.classList.add(player1.hand[i])
}

// console.log(deck)

// console.log(`${player1.name}: \n----------------- \nHand: ${player1.hand}\nChambers: ${player1.chambers}\n`)

// console.log(`${player2.name}: \n----------------- \nHand: ${player2.hand}\nChambers: ${player2.chambers}\n`)

// console.log(`${player3.name}: \n----------------- \nHand: ${player3.hand}\nChambers: ${player3.chambers}\n`)

// console.log(`${player4.name}: \n----------------- \nHand: ${player4.hand}\nChambers: ${player4.chambers}\n`)

// playCards(player2, 2)
// playCards(player1, 1)