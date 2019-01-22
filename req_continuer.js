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

	marqueurs = {};

	nb1 = Math.floor(Math.random() * 10) +1;
	nb2 = Math.floor(Math.random() * 10) +1;

	calcul = nb1+"*"+nb2;

	page = fs.readFileSync('question.html', 'utf-8');

	/*min= 15;
	max = 20;

	contenu_fichier = fs.readFileSync("allumette.json",'utf-8');
	allumette = JSON.parse(contenu_fichier);

	nb_allumettes = Math.round(Math.random() * (max-min) +min);
	console.log(nb_allumettes);

	allumette.nb_allumettes  = nb_allumettes;

	contenu_fichier = JSON.stringify(allumette);
	fs.writeFileSync("allumette.json",contenu_fichier ,'utf-8');*/
	marqueurs.nb1 = nb1;
	marqueurs.nb2 = nb2;
	marqueurs.calcul = calcul
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
