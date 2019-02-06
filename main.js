var Lrect = [];
window.addEventListener("load" , main);

function main(event){
	for (var i = 0; i < 1000; i++){
		createRects();
	}
	console.log("main");
}

function createRects(){
	var rect = randRect();
	
	if (!hitTestAll(rect)){
		if (((rect.x + rect.w) > window.innerWidth) || ((rect.y + rect.h) > window.innerHeight)){
			createRects(); //si la taille du rectangle est strictement superieur a celle de la fenetre, on cree un nouveau rect
		}
		else{
			Lrect.push(rect); //ajout du nouveau rect dans la liste
			factory("div", rect.x, rect.y, rect.w, rect.h);
		}
	}
	else{createRects();} //S'il y a une collision parmit un rectangle on cree un nouveau
}
function hitTestAll(rect) {
	for (var i = 0; i < Lrect.length; i++){
		if (hitTest(rect, Lrect[i])){
			return true; //collision avec un rectangle parmit la liste
		}
	}
	return false; //pas de collision
}

function factory(el, x, y, w, h){
	var element = document.createElement(el);
	element.style.position = "absolute";
	element.style.left = x + "px";
	element.style.top = y + "px";
	element.style.width = w + "px";
	element.style.height = h + "px";
	element.style.backgroundColor = randomColor();
	document.body.appendChild(element);
}

/*
Functions pour creer un rectangle de taille, couleur, coordonnees aleatoires.
*/
function hitTest(r1, r2) {
	return (((r1.x + r1.w >= r2.x) && (r1.x <= r2.x + r2.w )) && ((r1.y + r1.h >= r2.y) && (r1.y <= r2.y + r2.h)));
}
function randRect() {
	return {x: randRange(0, window.innerWidth), y: randRange(0, window.innerHeight), w: randRange(10, 200), h: randRange(10, 200)}
}
function randRange(min, max) {
	return Math.floor(Math.random() * (max-min+1)) + min;
}
function randomColor() {
	return "#" + Math.round(Math.random() * 0xFFFFFF).toString(16);
}