const CARDS_ARRAY = [
	{
		id: 1,
		path: "img/1.png",
	},
	{
		id: 2,
		path: "img/2.png",
	},
	{
		id: 3,
		path: "img/3.png",
	},
	{
		id: 4,
		path: "img/4.png",
	},
	{
		id: 5,
		path: "img/5.png",
	},
	{
		id: 6,
		path: "img/6.png",
	},
	{
		id: 7,
		path: "img/7.png",
	},
	{
		id: 8,
		path: "img/8.png",
	},
];
const CARDS_CONTAINER = document.getElementById("cards_container");
const TURN_DELAY = 970;
const openedNow = [];
let openedPairsCount = 0;
let startTime = Date.now();

const shuffleArray = (array) => array.sort(() => 0.5 - Math.random());

const getCardHTML = (cardObject) => {
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("data-id", cardObject["id"]);
	const cardFront = document.createElement("div");
	cardFront.classList.add("card__front");
	const cardBack = document.createElement("div");
	cardBack.classList.add("card__back");
	cardBack.style.backgroundImage = `url(${cardObject["path"]})`;
	card.append(cardFront, cardBack);
	return card;
};

const getAllCardsHTML = () => {
	const containerFragment= document.createDocumentFragment();
	const cardsShuffledArray = shuffleArray([...CARDS_ARRAY, ...CARDS_ARRAY]);
	cardsShuffledArray.forEach((card) => containerFragment.append(getCardHTML(card)));
	return containerFragment;
};

const checkPair = (twoCardsArray) => {
	if (twoCardsArray[0].dataset.id == twoCardsArray[1].dataset.id) {
		twoCardsArray.forEach((card) => {
			setTimeout(() => {
				card.classList.add("solved");
			}, TURN_DELAY);
		});
		openedPairsCount++;
	}
	twoCardsArray.forEach((card) => {
		setTimeout(() => {
			card.classList.remove("flipped");
		}, TURN_DELAY);
	});
};

const startGame = () => {
	openedPairsCount = 0;
	CARDS_CONTAINER.innerHTML = "";
	CARDS_CONTAINER.append(getAllCardsHTML());
	startTime = Date.now();
};

const initGame = () => {
	startGame();
	CARDS_CONTAINER.addEventListener("click", function ({ target }) {
		const cardClicked = target.closest(".card:not(.flipped):not(.solved)");
		if (cardClicked) {
			cardClicked.classList.add("flipped");
			openedNow.push(cardClicked);
			if (openedNow.length == 2) {
				checkPair(openedNow);
				openedNow.splice(0, 2);
				if (openedPairsCount == 8) {
					alert("You win!!!\nYour time is " + Math.floor((Date.now() - startTime) / 1000) + " seconds");
					setTimeout(startGame(), 2000);
				}
			}
		}
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initGame();
});
