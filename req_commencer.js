//=========================================================================
// Traitement de "req_commencer"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 12/09/2018
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

let trait = function (req, res, query) {

	let marqueurs;
	let page;
	let nb1;
	let nb2;
	let contenu_fichier;
	let calcul;
	let score;
	let min;
	let max;
	let allumette;
	let nb_allumettes;
	let html_allu;
	let i;

	marqueurs = {};

	/*nb1 = Math.floor(Math.random() * 10) +1;
	nb2 = Math.floor(Math.random() * 10) +1;

	calcul = nb1+"*"+nb2;

	contenu_fichier = fs.readFileSync("score.json", 'utf-8')
	score = JSON.parse(contenu_fichier);

	score.bon = 0;
	score.mauvais = 0;

	contenu_fichier = JSON.stringify(score);
	fs.writeFileSync("score.json", contenu_fichier, 'utf-8');
	
	console.log(score);

	page = fs.readFileSync('question.html', 'utf-8');*/

	min= 15;
	max = 20;

	contenu_fichier = fs.readFileSync("allumette.json",'utf-8');
	allumette = JSON.parse(contenu_fichier);

	nb_allumettes = Math.round(Math.random() * (max-min) +min);
	console.log(nb_allumettes);

	allumette.nb_allumettes  = nb_allumettes;
	allumette.tour = 1;
	allumette.vainqueur = "";
	allumette.victoire = [0, 0];

	contenu_fichier = JSON.stringify(allumette);
	fs.writeFileSync("allumette.json",contenu_fichier ,'utf-8');

	page = fs.readFileSync("allumette.html", 'utf-8');

	html_allu = "";
	for (i = 0; i < nb_allumettes; i++) {
		html_allu += "<img src='allumette.PNG'>";
	}

	marqueurs.nb1 = nb1
	marqueurs.nb2 = nb2
	marqueurs.calcul = calcul
	marqueurs.erreur = "";
	marqueurs.tour = allumette.tour;
	marqueurs.allumettes = html_allu;
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
