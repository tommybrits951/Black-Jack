

// Using arrays so I can use Math.random() to index points and card images.

const points = [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
const imgs = ["./deck/back.png", "./deck/ace_of_clubs.png", "./deck/ace_of_diamonds.png", "./deck/ace_of_hearts.png", "./deck/ace_of_spades.png", "./deck/2_of_clubs.png", "./deck/2_of_diamonds.png", "./deck/2_of_hearts.png", "./deck/2_of_spades.png", "./deck/3_of_clubs.png", "./deck/3_of_diamonds.png", "./deck/3_of_hearts.png", "./deck/3_of_spades.png", "./deck/4_of_clubs.png", "./deck/4_of_diamonds.png", "./deck/4_of_hearts.png", "./deck/4_of_spades.png", "./deck/5_of_clubs.png", "./deck/5_of_diamonds.png", "./deck/5_of_hearts.png", "./deck/5_of_spades.png", "./deck/6_of_clubs.png", "./deck/6_of_diamonds.png", "./deck/6_of_hearts.png", "./deck/6_of_spades.png", "./deck/7_of_clubs.png", "./deck/7_of_diamonds.png", "./deck/7_of_hearts.png", "./deck/7_of_spades.png", "./deck/8_of_clubs.png", "./deck/8_of_diamonds.png", "./deck/8_of_hearts.png", "./deck/8_of_spades.png", "./deck/9_of_clubs.png", "./deck/9_of_diamonds.png", "./deck/9_of_hearts.png", "./deck/9_of_spades.png", "./deck/10_of_clubs.png", "./deck/10_of_diamonds.png", "./deck/10_of_hearts.png", "./deck/10_of_spades.png", "./deck/jack_of_clubs.png", "./deck/jack_of_diamonds.png", "./deck/jack_of_hearts.png", "./deck/jack_of_spades.png", "./deck/queen_of_diamonds.png", "./deck/queen_of_hearts.png", "./deck/queen_of_spades.png", "./deck/queen_of_clubs.png", "./deck/king_of_clubs.png", "./deck/king_of_diamonds.png", "./deck/king_of_hearts.png", "./deck/king_of_spades.png"]


// Dom elements
const btns = {
    bet: Array.from(document.querySelectorAll(".bet-btn")),
    deal: document.querySelector(".deal-btn"),
    betBtnsCont: document.querySelector(".bet-btns"),
    playBtnsCont: document.querySelector(".play-btns"),
    hit: document.querySelector("#hitBtn"),
    stand: document.querySelector("#standBtn"),
    double: document.querySelector("#doubleBtn"),
    newBtn: document.querySelector("#newBtn"),
    sameBtn: document.querySelector("#sameBtn"),
}
const scoresCont = document.querySelector("#scores")
const moneyAmountDisp = document.querySelector("#moneyDisplay")
const betAmountDisp = document.querySelector("#betDisplay")
const resultsDisp = document.querySelector("#resultsDisplay")
const endDisp = document.querySelector(".end-btns")

// objects and array for keeping track of game values

let user = {
    name: "user",
    hand: [],
    cards: [],
    wallet: 0,
    bet: 0,
    ace: false,
    score: 0,
    handDisp: document.getElementById("userHand"),
    betCont: document.querySelector("#betCont"),
    scoreDisp: document.getElementById("userScoreDisp")
}
const betDisp = document.querySelector("#betDisp")
const walletDisp = document.querySelector("#walletDisp")
let wallet = 0
let bet = 0
async function getFunds() {
    const funds = await fetch("http://localhost:5000/money")
    const json = await funds.json()
    wallet = await json.money
    console.log(wallet)
    walletDisp.innerText = wallet -= 10
    betDisp.innerText = bet += 10
}
getFunds()
moneyAmountDisp.innerText = wallet;
betAmountDisp.innerText = bet;
async function postFunds() {
    console.log(wallet)
    const tmp = wallet + bet
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: `${tmp}`
    }
    let result 
    fetch("http://localhost:5000/money", options)
    .then(res => {
        console.log(res.data)
        result = res.data
    })
    .catch(err => console.log(err))
}


let dealer = {
    name: "dealer",
    score: 0,
    hand: [],
    cards: [],
    ace: false,
    playing: false,
    handDisp: document.getElementById("dealerHand"),
    scoreDisp: document.getElementById("dealerScoreDisp")
}
let table = []

// Functions to bring everything to their original values except winnings
function resetHands() {
    table = []
    dealer = {...dealer, hand: [], score: 0, cards: [], ace: false, playing: false}
    user = {...user, hand: [], cards: [], ace: false, score: 0}
    user.scoreDisp.innerText = user.score
    dealer.scoreDisp.innerText = dealer.score
}

function resetDOM(player) {
    player.cards.map(card => {
        player.handDisp.removeChild(card)
    })  
    player.cards = []  
}


// To determine winnings
function winnings(result) {
    if (result === "win") {
        wallet += bet
        walletDisp.innerText = wallet
    } else if (result === "lose") {
        bet = 0
        betDisp.innerText = bet
    }
    
}


// Dislay Win or Loss

function winDisplay(result) {
    endDisp.style.display = "flex"
    if (result === "win") {
        resultsDisp.innerText = "You Win!"
    } else if (result === "lose") {
        resultsDisp.innerText = "You Lose!"
    } else if (result === "off") {
        resultsDisp.innerText = ""
        endDisp.style.display = "none"
    } else if (result === "tie") {
        resultsDisp.innerText = "Draw"
    }
    
}


// Functions for changing what is displayed
function updateBet() {
    betDisp.innerText = bet
    walletDisp.innerText = wallet
}
updateBet()
function hidePlayBtns() {
    const { playBtnsCont } = btns
    playBtnsCont.style.display = "none"
}
function showPlayBtns() {
    const { playBtnsCont } = btns
    playBtnsCont.style.display = "flex"
}
hidePlayBtns()
function hideBet() {
    if (!betCont.classList.contains("hidden")) {
        betCont.classList.add("hidden")
        scoresCont.classList.remove("hidden")

    } else {
        scoresCont.classList.add("hidden")
        betCont.classList.remove("hidden")
    }
}


// To generate a random number that isn't arleady in table array
// then adding new index to the table array to make sure it isn't called again.
function rando() {
    for (let i = 0; i < 1; i++) {
        const num = Math.ceil(Math.random() * 52)
        if (table.includes(num)) {
            i--
        } else {
            table.push(num)
            return num
        }
    }
}

// Adding index to player arrays and creating DOM elements to display matching cards.

function createCard(player, num) {
    const img = document.createElement("img")
    const cont = document.createElement("div")
    img.src = imgs[num]
    img.classList.add("card-img")
    if (player.name === "dealer") {
        cont.classList.add("dealer-card-div")
        cont.style.left = `${Math.abs(player.hand.length * 0.3)}vw`
    } else {
        cont.classList.add("user-card-div")
    }
    cont.append(img)
    player.handDisp.append(cont)
}


function dealCard(player) {
    const num = rando()
    player.hand.push(num)
    createCard(player, num)
}

// to calculate score

function calcScore(player) {
    player.score = 0
    if (player.name === "dealer" && player.playing === false) {
        player.score += points[player.hand[1]]
        player.scoreDisp.innerText = player.score
    } else {
        for (let i = 0; i < player.hand.length; i++) {
            player.score += points[player.hand[i]]
        }
        player.scoreDisp.innerText = player.score
    }
}


// Check if player has an ace to change the score

function checkAce(player) {
    if (player.name === "dealer" && player.playing === false) {
        if (player.hand[1] < 5 && player.score < 12 && player.ace === false) {
            player.score += 10
            player.ace = true
            player.scoreDisp.innerText = player.score
        } else if (player.hand[1] < 5 && player.score >= 12 && player.ace === true) {
            player.score -= 10
            player.ace = false
            player.scoreDisp.innerText = player.score
        }
    } else {
        for (let i = 0; i < player.hand.length; i++) {
            if (player.hand[i] < 5 && player.score < 12 && player.ace === false) {
                player.score += 10
                player.ace = true
                player.scoreDisp.innerText = player.score
            } else if (player.score >= 12 && player.ace === true && player.hand[i] < 5) {
                player.score -= 10
                player.ace = false
                player.scoreDisp.innerText = player.score
            }
        }
    }
}

//Opening function to call other child functions for initial deal

function deal() {
    postFunds()
    hideBet()
    showPlayBtns()
    dealCard(dealer)
    dealCard(user)
    dealCard(dealer)
    dealCard(user)
    createCards(user)
    createCards(dealer)
    calcScore(user)
    calcScore(dealer)
    checkAce(user)
    checkAce(dealer)
    console.log(dealer)
}

function stand() {
    setInterval(() => {
        if (dealer.score <= 17) {
            hit(dealer)
        } else {
            clearInterval()
            
            endDisp.style.display = "flex"
            if (dealer.score > user.score && dealer.score <= 21) {
                winDisplay("lose")
                winnings("lose")
            } else if (dealer.score === user.score || (dealer.score > 21 && user.score > 21 )) {
                winDisplay("tie")
            } else if (dealer.score < user.score && user.score <= 21) {
                winDisplay("win")
                winnings("win")
            } else if (dealer.score > 21 && user.score <= 21) {
                winDisplay("win")
                winnings("win")
            } else if (dealer.score <= 21 && user.score > 21) {
                winDisplay("lose")
                winnings("lose")
            }
        }
    }, 800)
}





function checkBust(player) {
    if (player.score >= 21 && player.name === "user") {
        stand()
    }
}
function hit(player) {
    if (player.name === "dealer") {
        player.playing = true
    }
    dealCard(player)
    createCards(player)
    calcScore(player)
    checkAce(player)
    checkBust(player)
}

function betUp() {
    if (wallet > 10) {
        wallet -= 10
        bet += 10        
        updateBet()
    }
}
function betDown() {
    if (bet > 10) {
        wallet += 10
        bet -= 10
        updateBet()
    }
}

btns.bet.map((btn, idx) => {
    btn.addEventListener("click", (e) => {
        if (idx === 1) {
            betUp()
        } else {
            betDown()
        }
    })
})

btns.deal.addEventListener("click", () => deal())
btns.hit.addEventListener("click", () => hit(user))
btns.stand.addEventListener("click", () => stand())
btns.sameBtn.addEventListener("click", () => {
    endDisp.style.display = "none"
    resetDOM(dealer)
    resetDOM(user)
    resetHands()
    hideBet()
    deal()
})
btns.newBtn.addEventListener("click", () => {
    endDisp.style.display="none"
    resetDOM(dealer)
    resetDOM(user)
    resetHands()
    hidePlayBtns()
    btns.betBtnsCont.style.display = "flex"  
})