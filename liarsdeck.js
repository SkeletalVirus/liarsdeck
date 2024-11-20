const players = ['', '', '', '']
const deck = []
let table = ''
let lastPlayed = {
    player: '',
    card: ''
}

let exodiaMode = false

let activePlayer

const handDisplay = document.getElementsByClassName('currentHand')[0]
const mainField = document.getElementsByClassName('fieldCenter')[0]

const p1Display = document.getElementById('p1')
const p2Display = document.getElementById('p2')
const p3Display = document.getElementById('p3')
const p4Display = document.getElementById('p4')

const liarBtn = document.getElementById('liarBtn')
const playHandBtn = document.getElementById('playHandBtn')
const skipTurnBtn = document.getElementById('skipTurnBtn')
const playExodiaBtn = document.getElementById('playExodiaBtn')

function openDebug() {
    document.getElementsByClassName('debug')[0].classList.toggle('debugHidden')
}

function player(name) {
    this.name = name
    this.chambers = 6
    this.hand = []
    this.dead = false
}

function initiatePlayers() {
    if (players.length <= 4) {
        for (let i = 0; i < players.length; i++) {
            switch (i) {
                case 0:
                    player1 = new player(players[i])
                    // giveHand(player1)
                    if (player1.name != '') {
                        p1Display.style.display = 'grid'
                        p1Display.querySelector('.playerNameDisplay').innerHTML = player1.name
                    }
                    else {
                        player1.dead = true
                    }
                    break
                case 1:
                    player2 = new player(players[i])
                    // giveHand(player2)
                    if (player2.name != '') {
                        p2Display.style.display = 'grid'
                        p2Display.querySelector('.playerNameDisplay').innerHTML = player2.name
                    }
                    else {
                        player2.dead = true
                    }
                    break
                case 2:
                    player3 = new player(players[i])
                    // giveHand(player3)
                    if (player3.name != '') {
                        p3Display.style.display = 'grid'
                        p3Display.querySelector('.playerNameDisplay').innerHTML = player3.name
                    }
                    else {
                        player3.dead = true
                    }
                    break
                case 3:
                    player4 = new player(players[i])
                    // giveHand(player4)
                    if (player4.name != '') {
                        p4Display.style.display = 'grid'
                        p4Display.querySelector('.playerNameDisplay').innerHTML = player4.name
                    }
                    else {
                        player4.dead = true
                    }
                    break
            }

        }
    }
    else {
        console.log('Too Many Players')
    }
}

function initiateDeck() {
    for (let i = 0; i < 6; i++) {
        deck.push('king')
        deck.push('queen')
        deck.push('jack')
    }
    deck.push('wild', 'wild')

    const tablePossibilities = ['king', 'queen', 'jack']
    table = tablePossibilities[Math.floor(Math.random() * tablePossibilities.length)]
    console.log(`Current Table is ${table}`)
}

function giveHand(player) {
    for (let i = 0; i < 5; i++) {
        randNum = Math.floor(Math.random() * deck.length)
        player.hand.push(deck[randNum])
        deck.splice(randNum, 1)
    }
}

function switchToNextActivePlayer() {

    const activePlayerList = []

    for (let i = 0; i < players.length; i++) {
        switch (players[i]) {
            case player1.name:
                if (player1.hand.length != 0 || p1Display.classList.contains('deadPlayer') === false) {
                    activePlayerList.push(player1)
                }
                break
            case player2.name:
                if (player2.hand.length != 0 || p2Display.classList.contains('deadPlayer') === false) {
                    activePlayerList.push(player2)
                }
                break
            case player3.name:
                if (player3.hand.length != 0 || p3Display.classList.contains('deadPlayer') === false) {
                    activePlayerList.push(player3)
                }
                break
            case player4.name:
                if (player4.hand.length != 0 || p4Display.classList.contains('deadPlayer') === false) {
                    activePlayerList.push(player4)
                }
                break
        }

    }
    
    let currentActivePlayerIndex = ''
    for (let i = 0; i < activePlayerList.length; i++) {
        if (activePlayerList[i] === activePlayer) {
            currentActivePlayerIndex = i
        }
    }
    
    if (activePlayerList[currentActivePlayerIndex + 1] === undefined) {
        changeActivePlayer(player1)
    }
    else {
        changeActivePlayer(activePlayerList[currentActivePlayerIndex + 1])
        
        console.log(activePlayerList)
    }

    if (activePlayer.dead === true || activePlayer.hand.length <= 0) {
        switchToNextActivePlayer()
    }
    
    switch(activePlayer) {
        case player1:
            if (player2.hand.length < 1 && player3.hand.length < 1 && player4.hand.length < 1) {
                callLiar(activePlayer)
            }
            break
        case player2:
            if (player1.hand.length < 1 && player3.hand.length < 1 && player4.hand.length < 1) {
                callLiar(activePlayer)
            }
            break
        case player3:
            if (player2.hand.length < 1 && player1.hand.length < 1 && player4.hand.length < 1) {
                callLiar(activePlayer)
            }
            break
        case player4:
            if (player2.hand.length < 1 && player3.hand.length < 1 && player1.hand.length < 1) {
                callLiar(activePlayer)
            }
            break
    }    

    skipTurnBtn.classList.remove('disabled')
    liarBtn.classList.remove('disabled')
}
    
function playCards(player) {
        const cardsRaw = document.getElementsByClassName('selected');
    const cardsRemoveFromHand = [];
    const cards = [];


    if (cardsRaw.length <= 3 && cardsRaw.length > 0) {
        // Collect selected card IDs and their types
        for (let i = 0; i < cardsRaw.length; i++) {
            const card = parseInt(cardsRaw[i].id); // Convert ID to integer index
            const cardType = player.hand[card];
            cards.push(cardType);
            cardsRemoveFromHand.push(card);

            console.log(card);
            console.log(cardType);
        }

        // Create newHand by excluding indexes in cardsRemoveFromHand
        const newHand = player.hand
            .map((_, index) => index)
            .filter(index => !cardsRemoveFromHand.includes(index))
            .map(index => player.hand[index]); // Map back to actual cards


        handDisplay.innerHTML = ''
        mainField.innerHTML = ''


        // Uncomment and adjust if you want to update `lastPlayed` with the played cards
        lastPlayed.player = player.name;
        lastPlayed.card = cards;

        for (let i = 0; i < lastPlayed.card.length; i++) {
            const displayCard = document.createElement('div')
            displayCard.classList.add('cardDisplay')

            switch (lastPlayed.card[i]) {
                case 'king':
                    displayCard.classList.add('king')
                    break
                case 'queen':
                    displayCard.classList.add('queen')
                    break
                case 'jack':
                    displayCard.classList.add('jack')
                    break
                case 'wild':
                    displayCard.classList.add('wild')
                    break
            }

            displayCard.classList.add('cardFlipped')
            // displayCard.addEventListener('click', this.classList.toggle('cardFlipped'))
            mainField.appendChild(displayCard)
        }
        // Update player's hand
        player.hand = newHand;

        giveCards(player)

        switch (lastPlayed.player) {
            case player1.name:
                if (!player1.hand.length <= 0) {
                    document.getElementById('p1HandDisplay').innerHTML = ''
                    for (let i = 0; i < player1.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p1HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p1HandDisplay').innerHTML = ''
                    console.log('player 1 has cleared their hand')
                }
            case player2.name:
                if (!player2.hand.length <= 0) {
                    document.getElementById('p2HandDisplay').innerHTML = ''
                    for (let i = 0; i < player2.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p2HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p2HandDisplay').innerHTML = ''
                }
            case player3.name:
                if (!player3.hand.length <= 0) {
                    document.getElementById('p3HandDisplay').innerHTML = ''
                    for (let i = 0; i < player3.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p3HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p3HandDisplay').innerHTML = ''
                }
            case player4.name:
                if (!player4.hand.length <= 0) {
                    document.getElementById('p4HandDisplay').innerHTML = ''
                    for (let i = 0; i < player4.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p4HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p4HandDisplay').innerHTML = ''
                }
        }
        console.log(player.hand)
        console.log(lastPlayed)
        console.log(lastPlayed.player)

        switchToNextActivePlayer()
    }
}

function playCards(player) {
    const cardsRaw = document.getElementsByClassName('selected');
    const cardsRemoveFromHand = [];
    const cards = [];


    if (cardsRaw.length <= 3 && cardsRaw.length > 0) {
        // Collect selected card IDs and their types
        for (let i = 0; i < cardsRaw.length; i++) {
            const card = parseInt(cardsRaw[i].id); // Convert ID to integer index
            const cardType = player.hand[card];
            cards.push(cardType);
            cardsRemoveFromHand.push(card);

            console.log(card);
            console.log(cardType);
        }

        // Create newHand by excluding indexes in cardsRemoveFromHand
        const newHand = player.hand
            .map((_, index) => index)
            .filter(index => !cardsRemoveFromHand.includes(index))
            .map(index => player.hand[index]); // Map back to actual cards


        handDisplay.innerHTML = ''
        mainField.innerHTML = ''


        // Uncomment and adjust if you want to update `lastPlayed` with the played cards
        lastPlayed.player = player.name;
        lastPlayed.card = cards;
        lastPlayed.exodia = false

        for (let i = 0; i < lastPlayed.card.length; i++) {
            const displayCard = document.createElement('div')
            displayCard.classList.add('cardDisplay')

            switch (lastPlayed.card[i]) {
                case 'king':
                    displayCard.classList.add('king')
                    break
                case 'queen':
                    displayCard.classList.add('queen')
                    break
                case 'jack':
                    displayCard.classList.add('jack')
                    break
                case 'wild':
                    displayCard.classList.add('wild')
                    break
            }

            displayCard.classList.add('cardFlipped')
            // displayCard.addEventListener('click', this.classList.toggle('cardFlipped'))
            mainField.appendChild(displayCard)
        }
        // Update player's hand
        player.hand = newHand;

        giveCards(player)

        switch (lastPlayed.player) {
            case player1.name:
                if (!player1.hand.length <= 0) {
                    document.getElementById('p1HandDisplay').innerHTML = ''
                    for (let i = 0; i < player1.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p1HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p1HandDisplay').innerHTML = ''
                    console.log('player 1 has cleared their hand')
                }
            case player2.name:
                if (!player2.hand.length <= 0) {
                    document.getElementById('p2HandDisplay').innerHTML = ''
                    for (let i = 0; i < player2.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p2HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p2HandDisplay').innerHTML = ''
                }
            case player3.name:
                if (!player3.hand.length <= 0) {
                    document.getElementById('p3HandDisplay').innerHTML = ''
                    for (let i = 0; i < player3.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p3HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p3HandDisplay').innerHTML = ''
                }
            case player4.name:
                if (!player4.hand.length <= 0) {
                    document.getElementById('p4HandDisplay').innerHTML = ''
                    for (let i = 0; i < player4.hand.length; i++) {
                        const playerHandDisplayCard = document.createElement('div')
                        playerHandDisplayCard.classList.add('cardDisplayMini')
                        playerHandDisplayCard.classList.add('cardFlipped')
                        document.getElementById('p4HandDisplay').appendChild(playerHandDisplayCard)
                    }
                }
                else {
                    document.getElementById('p4HandDisplay').innerHTML = ''
                }
        }
        console.log(player.hand)
        console.log(lastPlayed)
        console.log(lastPlayed.player)

        switchToNextActivePlayer()
    }
}

function playExodia(player) {
    const cardsRaw = document.getElementsByClassName('selected');
const cardsRemoveFromHand = [];
const cards = [];


if (cardsRaw.length === 5) {
    // Collect selected card IDs and their types
    for (let i = 0; i < cardsRaw.length; i++) {
        const card = parseInt(cardsRaw[i].id); // Convert ID to integer index
        const cardType = player.hand[card];
        cards.push(cardType);
        cardsRemoveFromHand.push(card);

        console.log(card);
        console.log(cardType);
    }

    // Create newHand by excluding indexes in cardsRemoveFromHand
    const newHand = player.hand
        .map((_, index) => index)
        .filter(index => !cardsRemoveFromHand.includes(index))
        .map(index => player.hand[index]); // Map back to actual cards


    handDisplay.innerHTML = ''
    mainField.innerHTML = ''


    // Uncomment and adjust if you want to update `lastPlayed` with the played cards
    lastPlayed.player = player.name;
    lastPlayed.card = cards;

    for (let i = 0; i < lastPlayed.card.length; i++) {
        const displayCard = document.createElement('div')
        displayCard.classList.add('cardDisplay')

        switch (lastPlayed.card[i]) {
            case 'king':
                displayCard.classList.add('king')
                break
            case 'queen':
                displayCard.classList.add('queen')
                break
            case 'jack':
                displayCard.classList.add('jack')
                break
            case 'wild':
                displayCard.classList.add('wild')
                break
        }

        displayCard.classList.add('cardFlipped')
        // displayCard.addEventListener('click', this.classList.toggle('cardFlipped'))
        mainField.appendChild(displayCard)
    }
    // Update player's hand
    player.hand = newHand;

    giveCards(player)

    switch (lastPlayed.player) {
        case player1.name:
            if (!player1.hand.length <= 0) {
                document.getElementById('p1HandDisplay').innerHTML = ''
                for (let i = 0; i < player1.hand.length; i++) {
                    const playerHandDisplayCard = document.createElement('div')
                    playerHandDisplayCard.classList.add('cardDisplayMini')
                    playerHandDisplayCard.classList.add('cardFlipped')
                    document.getElementById('p1HandDisplay').appendChild(playerHandDisplayCard)
                }
            }
            else {
                document.getElementById('p1HandDisplay').innerHTML = ''
                console.log('player 1 has cleared their hand')
            }
        case player2.name:
            if (!player2.hand.length <= 0) {
                document.getElementById('p2HandDisplay').innerHTML = ''
                for (let i = 0; i < player2.hand.length; i++) {
                    const playerHandDisplayCard = document.createElement('div')
                    playerHandDisplayCard.classList.add('cardDisplayMini')
                    playerHandDisplayCard.classList.add('cardFlipped')
                    document.getElementById('p2HandDisplay').appendChild(playerHandDisplayCard)
                }
            }
            else {
                document.getElementById('p2HandDisplay').innerHTML = ''
            }
        case player3.name:
            if (!player3.hand.length <= 0) {
                document.getElementById('p3HandDisplay').innerHTML = ''
                for (let i = 0; i < player3.hand.length; i++) {
                    const playerHandDisplayCard = document.createElement('div')
                    playerHandDisplayCard.classList.add('cardDisplayMini')
                    playerHandDisplayCard.classList.add('cardFlipped')
                    document.getElementById('p3HandDisplay').appendChild(playerHandDisplayCard)
                }
            }
            else {
                document.getElementById('p3HandDisplay').innerHTML = ''
            }
        case player4.name:
            if (!player4.hand.length <= 0) {
                document.getElementById('p4HandDisplay').innerHTML = ''
                for (let i = 0; i < player4.hand.length; i++) {
                    const playerHandDisplayCard = document.createElement('div')
                    playerHandDisplayCard.classList.add('cardDisplayMini')
                    playerHandDisplayCard.classList.add('cardFlipped')
                    document.getElementById('p4HandDisplay').appendChild(playerHandDisplayCard)
                }
            }
            else {
                document.getElementById('p4HandDisplay').innerHTML = ''
            }
    }
    console.log(player.hand)
    console.log(lastPlayed)
    console.log(lastPlayed.player)

    switchToNextActivePlayer()
}
}

function callLiar(player) {
    const matchingCards = []
    if (lastPlayed.card != '') {
        for (let i = 0; i < lastPlayed.card.length; i++) {
            console.log(lastPlayed.card[i])
            if (lastPlayed.card[i] === table || lastPlayed.card[i] === 'wild') {
                matchingCards.push(lastPlayed.card[i])
            }
        }
        console.log(matchingCards)

        console.log(lastPlayed)
        if (matchingCards.length === lastPlayed.card.length) {
            decrementChamber(player.name)
            console.log('truth')
        }
        else {
            decrementChamber(lastPlayed.player)
            console.log('lie')
        }
    }

    for (let i = 0; i < mainField.children.length; i++) {
        mainField.children[i].classList.remove('cardFlipped')
    }

    handDisplay.innerHTML = ''
    const nextRoundBtn = document.createElement('button')
    const nextRoundBtnText = document.createElement('p')
    nextRoundBtn.classList.add('gameButton')
    nextRoundBtnText.innerHTML = 'Next Round'
    nextRoundBtn.addEventListener('click', startRound)
    nextRoundBtn.appendChild(nextRoundBtnText)
    handDisplay.appendChild(nextRoundBtn)

    playExodiaBtn.classList.add('debugHidden')
    playHandBtn.classList.add('disabled')
    playHandBtn.classList.remove('debugHidden')
    liarBtn.classList.add('disabled')
    skipTurnBtn.classList.add('disabled')
}

function decrementChamber(player) {
    switch (player) {
        case player1.name:
            player = player1
            break
        case player2.name:
            player = player2
            break
        case player3.name:
            player = player3
            break
        case player4.name:
            player = player4
            break
    }

    const rouletteRoll = Math.floor(Math.random() * player.chambers)
    if (lastPlayed.card.length > 3) {
        player.dead = true
        switch (player) {
            case player1:
                p1Display.classList.add('deadPlayer')
                p1Display.style.filter = 'grayscale(100%)'
                document.getElementById('p1ChamberDisplay').innerHTML = `Exodia`
                break
            case player2:
                p2Display.classList.add('deadPlayer')
                p2Display.style.filter = 'grayscale(100%)'
                document.getElementById('p2ChamberDisplay').innerHTML = `Exodia`
                break
            case player3:
                p3Display.classList.add('deadPlayer')
                p3Display.style.filter = 'grayscale(100%)'
                document.getElementById('p3ChamberDisplay').innerHTML = `Exodia`
                break
            case player4:
                p4Display.classList.add('deadPlayer')
                p4Display.style.filter = 'grayscale(100%)'
                document.getElementById('p4ChamberDisplay').innerHTML = `Exodia`
                break
        }
    }
    else {
        player.chambers--
        if (rouletteRoll === 0) {
            player.dead = true
            switch (player) {
                case player1:
                    p1Display.classList.add('deadPlayer')
                    p1Display.style.filter = 'grayscale(100%)'
                    break
                case player2:
                    p2Display.classList.add('deadPlayer')
                    p2Display.style.filter = 'grayscale(100%)'
                    break
                case player3:
                    p3Display.classList.add('deadPlayer')
                    p3Display.style.filter = 'grayscale(100%)'
                    break
                case player4:
                    p4Display.classList.add('deadPlayer')
                    p4Display.style.filter = 'grayscale(100%)'
                    break
            }
        }
        else {
            switch (player) {
                case player1:
                    document.getElementById('p1ChamberDisplay').innerHTML = `${player.chambers}/6`
                    break
                case player2:
                    document.getElementById('p2ChamberDisplay').innerHTML = `${player.chambers}/6`
                    break
                case player3:
                    document.getElementById('p3ChamberDisplay').innerHTML = `${player.chambers}/6`
                    break
                case player4:
                    document.getElementById('p4ChamberDisplay').innerHTML = `${player.chambers}/6`
                    break
            }
    
        }
    }
    console.log(`Chambers: ${player.chambers} \nRoll: ${rouletteRoll}`)
    // console.log(player)
}

function selectCard() {
    this.classList.toggle('selected')

    if(exodiaMode === true) {
        if(document.getElementsByClassName('selected').length === 5) {
            const truthCards = []
            const lieCards = []
            for(let i = 0; i < activePlayer.hand.length; i++) {
                if (activePlayer.hand[i] === table || activePlayer.hand[i] === 'wild') {
                    truthCards.push(activePlayer.hand[i])
                }
                else {
                    lieCards.push(activePlayer.hand[i])
                }
            }

            if (truthCards.length === 5 || lieCards.length === 5) {
                playHandBtn.classList.add('debugHidden')
                playExodiaBtn.classList.remove('debugHidden')
            }
        }
        else {
            playHandBtn.classList.remove('debugHidden')
            playExodiaBtn.classList.add('debugHidden')
        }
    }
}

function giveCards() {
    const player = activePlayer

    handDisplay.innerHTML = ''
    for (let i = 0; i < player.hand.length; i++) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.classList.add('p1')
        card.setAttribute('id', i)
        card.classList.add(player.hand[i])
        card.addEventListener('click', selectCard)

        if (activePlayer.hand[i] === table || activePlayer.hand[i] === 'wild') {
            card.classList.add('correctTable')
        }

        handDisplay.appendChild(card)
    }
}

function showHand() {
    skipTurnBtn.classList.add('disabled')
    playHandBtn.classList.remove('disabled')
    giveCards(activePlayer)
}

function changeActivePlayer(player) {
    activePlayer = player
    const showHandButton = document.createElement('button')
    showHandButton.classList.add('gameButton')
    showHandButton.addEventListener('click', showHand)
    const showHandButtonText = document.createElement('p')
    showHandButtonText.innerHTML = 'Show Hand'
    showHandButton.appendChild(showHandButtonText)
    handDisplay.innerHTML = ''
    handDisplay.appendChild(showHandButton)

    document.getElementsByClassName('activePlayer')[0].classList.toggle('activePlayer')

    switch (activePlayer) {
        case player1:
            document.getElementById('p1').classList.add('activePlayer')
            break
        case player2:
            document.getElementById('p2').classList.add('activePlayer')
            break
        case player3:
            document.getElementById('p3').classList.add('activePlayer')
            break
        case player4:
            document.getElementById('p4').classList.add('activePlayer')
            break
    }
    console.log(`active player changed to ${activePlayer.name}`)

    skipTurnBtn.classList.add('disabled')
    playExodiaBtn.classList.add('debugHidden')
    skipTurnBtn.classList.remove('debugHidden')
}

function startRound() {
    initiateDeck()
    handDisplay.innerHTML = ''

    
    player1.hand = []
    player2.hand = []
    player3.hand = []
    player4.hand = []
    

    if (player1.dead != true) {
        giveHand(player1)
    }
    if (player2.dead != true) {
        giveHand(player2)
    }
    if (player3.dead != true) {
        giveHand(player3)
    }
    if (player4.dead != true) {
        giveHand(player4)
    }
    
    document.getElementById('p1HandDisplay').innerHTML = ''
    document.getElementById('p2HandDisplay').innerHTML = ''
    document.getElementById('p3HandDisplay').innerHTML = ''
    document.getElementById('p4HandDisplay').innerHTML = ''
    
        const playerHandDisplayCard = document.createElement('div')
        playerHandDisplayCard.classList.add('cardDisplayMini')
        playerHandDisplayCard.classList.add('cardFlipped')
        
        for (let i = 0; i < 5; i++) {
            document.getElementById('p1HandDisplay').appendChild(playerHandDisplayCard.cloneNode(true))
            document.getElementById('p2HandDisplay').appendChild(playerHandDisplayCard.cloneNode(true))
            document.getElementById('p3HandDisplay').appendChild(playerHandDisplayCard.cloneNode(true))
            document.getElementById('p4HandDisplay').appendChild(playerHandDisplayCard.cloneNode(true))
        }

        mainField.innerHTML = ''
        lastPlayed.player = ''
        lastPlayed.card = []

    if (player1.dead != true) {
        changeActivePlayer(player1)
    }
    else if (player2.dead != true) {
        changeActivePlayer(player2)
    }
    else if (player3.dead != true) {
        changeActivePlayer(player3)
    }
    else if (player4.dead != true) {
        changeActivePlayer(player4)
    }

    switch(activePlayer) {
        case player1:
            if (player2.dead === true && player3.dead === true && player4.dead === true) {
                winScreen(activePlayer)    
            }
            break
        case player2:
            if (player1.dead === true && player3.dead === true && player4.dead === true) {
                winScreen(activePlayer)    
            }
            break
        case player3:
            if (player1.dead === true && player2.dead === true && player4.dead === true) {
                winScreen(activePlayer)    
            }
            break
        case player4:
            if (player1.dead === true && player2.dead === true && player3.dead === true) {
                winScreen(activePlayer)    
            }
            break
    }   
    
    const showHandButton = document.createElement('button')
    showHandButton.classList.add('gameButton')
    showHandButton.addEventListener('click', showHand)
    const showHandButtonText = document.createElement('p')
    showHandButtonText.innerHTML = 'Show Hand'
    showHandButton.appendChild(showHandButtonText)
    handDisplay.innerHTML = ''
    handDisplay.appendChild(showHandButton)

    skipTurnBtn.classList.remove('disabled')
    skipTurnBtn.classList.remove('disabled')
    
    console.log(`${player1.name}: \n----------------- \nHand: ${player1.hand}\nChambers: ${player1.chambers}\n`)
    console.log(`${player2.name}: \n----------------- \nHand: ${player2.hand}\nChambers: ${player2.chambers}\n`)
    console.log(`${player3.name}: \n----------------- \nHand: ${player3.hand}\nChambers: ${player3.chambers}\n`)
    console.log(`${player4.name}: \n----------------- \nHand: ${player4.hand}\nChambers: ${player4.chambers}\n`)
}

function winScreen(player) {
    const winScreen = document.createElement('div')
    const winScreenContent = document.createElement('div')
    const winText = document.createElement('p')
    const winnerName = document.createElement('p')
    const playAgainBtn = document.createElement('button')
    const btnText = document.createElement('p')

    winScreen.classList.add('winScreen')
    winnerName.innerHTML = activePlayer.name
    winText.innerHTML = 'WIN'
    playAgainBtn.classList.add('gameButton')
    playAgainBtn.addEventListener('click', reloadPage)
    btnText.innerHTML = 'Play Again'

    winScreenContent.appendChild(winnerName)
    playAgainBtn.appendChild(btnText)
    winScreen.appendChild(winText)
    winScreen.appendChild(winScreenContent)
    winScreen.appendChild(playAgainBtn)
    mainField.appendChild(winScreen)

    playHandBtn.classList.add('disabled')
    liarBtn.classList.add('disabled')
    skipTurnBtn.classList.add('disabled')
}

function reloadPage() {
    location.reload()
}

function startGame() {

    if(document.getElementById('exodiaMode').checked) {
        exodiaMode = true
    }

    while (document.getElementsByClassName('setting').length > 0) {
        document.getElementsByClassName('setting')[0].remove()
    }

    if (document.getElementById('player1Name').value != '' && document.getElementById('player2Name').value != '') {
        players[0] = document.getElementById('player1Name').value
        players[1] = document.getElementById('player2Name').value
        players[2] = document.getElementById('player3Name').value
        players[3] = document.getElementById('player4Name').value
        
        initiatePlayers()
        startRound()

        // player1.hand = ['wild', 'wild', 'wild', 'wild', 'wild']
        // player1.hand = ['king', 'king', 'king', 'king', 'king']
    }
    else {
        if (document.getElementsByClassName('startScreen')[0].children.length < 6) {
            const errorMsg = document.createElement('p')
            errorMsg.classList.add('error')
            errorMsg.innerHTML = 'You need at least 2 players to play'
            document.getElementsByClassName('startScreen')[0].appendChild(errorMsg)
        }
    }
}



// console.log(deck)
// playCards(player2, 2)
// playCards(player1, 1)