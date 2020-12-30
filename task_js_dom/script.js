const pokemons = [
	{
		id: 121,
		name: "Starmie",
		description: "This Pokémon has an organ known as its core. The organ glows in seven colors when Starmie is unleashing its potent psychic powers.",
		imagePath: "./img/121.png",
	},
	{
		id: 201,
		name: "Unown",
		description: "This Pokémon is shaped like ancient writing. It is a mystery as to which came first, the ancient writings or the various Unown. Research into this topic is ongoing but nothing is known.",
		imagePath: "./img/201.png",
	},
	{
		id: 337,
		name: "Lunatone",
		description: "The phase of the moon apparently has some effect on its power. It’s active on the night of a full moon.",
		imagePath: "./img/337.png",
	},
	{
		id: 338,
		name: "Solrock",
		description: "When it rotates itself, it gives off light similar to the sun, thus blinding its foes.",
		imagePath: "./img/338.png",
	},
	{
		id: 790,
		name: "Cosmoem",
		description: "The king who ruled Alola in times of antiquity called it the “cocoon of the stars” and built an altar to worship it.",
		imagePath: "./img/790.png",
	},
];

const createMenuLinks = (array, container) => {
	let wrapper = document.createElement("ul");
	array.forEach((element) => {
		let li = document.createElement("li");
		li.textContent = element.name;
		li.dataset.id = element.id;
		li.classList = "";
		wrapper.appendChild(li);
	});
	container.appendChild(wrapper);
};

const getMainContent = (id, arr) => {
	let wrapper = document.createElement("div");
	let item = arr.find((item) => item.id == id);
	let h2 = document.createElement("h2");
	h2.classList = "main__name";
	h2.innerText = item.name;
	let img = document.createElement("img");
	img.classList = "main__img";
	img.src = item.imagePath;
	img.alt = item.name;
	let p = document.createElement("p");
	p.classList = "main__text";
	p.innerText = item.description;
	wrapper.append(h2, img, p);
	return wrapper;
};

document.addEventListener("DOMContentLoaded", () => {
	const nav = document.getElementById("navigation");
	const main = document.getElementById("main");
	createMenuLinks(pokemons, nav);

	nav.addEventListener("click", function ({ target }) {
		let currentId = target.dataset.id;
		let oldId = nav.querySelector(".active")?.dataset.id;
		if (target.nodeName === "LI" && oldId !== currentId) {
			nav.querySelector(".active")?.classList.toggle("active");
			target.classList.toggle("active");
			main.innerHTML = "";
			main.appendChild(getMainContent(currentId, pokemons));
		}
	});
	document.getElementById("nav_switch").addEventListener("click", function () {
		nav.classList.toggle("active");
		this.classList.toggle("active");
	});
});
