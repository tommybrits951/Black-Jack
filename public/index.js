const points = [0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
const imgs = ["./deck/back.png", "./deck/ace_of_clubs.png", "./deck/ace_of_diamonds.png", "./deck/ace_of_hearts.png", "./deck/ace_of_spades.png", "./deck/2_of_clubs.png", "./deck/2_of_diamonds.png", "./deck/2_of_hearts.png", "./deck/2_of_spades.png", "./deck/3_of_clubs.png", "./deck/3_of_diamonds.png", "./deck/3_of_hearts.png", "./deck/3_of_spades.png", "./deck/4_of_clubs.png", "./deck/4_of_diamonds.png", "./deck/4_of_hearts.png", "./deck/4_of_spades.png", "./deck/5_of_clubs.png", "./deck/5_of_diamonds.png", "./deck/5_of_hearts.png", "./deck/5_of_spades.png", "./deck/6_of_clubs.png", "./deck/6_of_diamonds.png", "./deck/6_of_hearts.png", "./deck/6_of_spades.png", "./deck/7_of_clubs.png", "./deck/7_of_diamonds.png", "./deck/7_of_hearts.png", "./deck/7_of_spades.png", "./deck/8_of_clubs.png", "./deck/8_of_diamonds.png", "./deck/8_of_hearts.png", "./deck/8_of_spades.png", "./deck/9_of_clubs.png", "./deck/9_of_diamonds.png", "./deck/9_of_hearts.png", "./deck/9_of_spades.png", "./deck/10_of_clubs.png", "./deck/10_of_diamonds.png", "./deck/10_of_hearts.png", "./deck/10_of_spades.png", "./deck/jack_of_clubs.png", "./deck/jack_of_diamonds.png", "./deck/jack_of_hearts.png", "./deck/jack_of_spades.png", "./deck/queen_of_diamonds.png", "./deck/queen_of_hearts.png", "./deck/queen_of_spades.png", "./deck/queen_of_clubs.png", "./deck/king_of_clubs.png", "./deck/king_of_diamonds.png", "./deck/king_of_hearts.png", "./deck/king_of_spades.png"]

const btns = {
    bet: Array.from(document.querySelectorAll(".bet-btn")),
    deal: document.querySelector(".deal-btn"),
    playBtnsCont: document.querySelector(".play-btns"),
    hit: document.querySelector("#hitBtn"),
    stand: document.querySelector("#standBtn"),
    double: document.querySelector("#doubleBtn")
}
const scoresCont = document.querySelector("#scores")
let user = {
    name: "user",
    wallet: 9990,
    bet: 10,
    hand: [],
    cards: [],
    ace: false,
    score: 0,
    handDisp: document.getElementById("userHand"),
    betDisp: document.querySelector("#betDisp"),
    betCont: document.querySelector("#betCont"),
    walletDisp: document.querySelector("#walletDisp"),
    scoreDisp: document.getElementById("userScoreDisp")
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


function updateBet() {
    user.betDisp.innerText = user.bet
    user.walletDisp.innerText = user.wallet
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
    if (!user.betCont.classList.contains("hidden")) {
        user.betCont.classList.add("hidden")
        scoresCont.classList.remove("hidden")

    } else {
        scoresCont.classList.add("hidden")
        user.betCont.classList.remove("hidden")
    }
}

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

function createCards(player) {
    if (player.name === "dealer" && player.playing === false) {
        const cont1 = document.createElement("div")
        cont1.classList.add("card-div")
        const img1 = document.createElement("img")
        img1.classList.add("card-img")
        img1.src = imgs[player.hand[1]]
        cont1.append(img1)
        player.handDisp.append(cont1)
        const cont2 = document.createElement("div")
        cont2.classList.add("card-div")
        const img2 = document.createElement("img")
        img2.classList.add("card-img")
        img2.src = imgs[0]
        cont2.append(img2)
        cont2.style.left = `${cont2.style.left += 3}vw`
        player.handDisp.append(cont2)
    } else {
        for (let i = 0; i < player.hand.length; i++) {
            const cont = document.createElement("div")
            cont.classList.add("card-div")
            cont.style.left = `${i * 3}vw`
            const img = document.createElement("img")
            img.classList.add("card-img")
            img.src = imgs[player.hand[i]]
            cont.append(img)
            player.handDisp.append(cont)
        }
    }
}
function dealCard(player) {
    const num = rando()
    player.hand.push(num)
    console.log(player.hand, player.name)
}
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
function deal() {
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
}

function hit() {
    dealCard(user)
    createCards(user)
    calcScore(user)
    checkAce(user)
}

btns.bet.map(btn => {
    btn.addEventListener("click", (e) => {
        const txt = e.target.innerText
        if (txt === "+" && user.wallet >= 10) {
            user.wallet -= 10
            user.bet += 10
            updateBet()
        } else if (txt === "-" && user.bet > 10) {
            user.wallet += 10
            user.bet -= 10
            updateBet()
        }
    })
})
btns.deal.addEventListener("click", () => deal())
btns.hit.addEventListener("click", () => hit())