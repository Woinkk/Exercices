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
	let resultat;

	marqueurs = {};

	resultat = query.nb1 * query.nb2 

	calcul = query.nb1+"*"+query.nb2+" = "+ resultat;

	contenu_fichier = fs.readFileSync("score.json", 'utf-8')
	score = JSON.parse(contenu_fichier);

	if (Number(query.reponse) === resultat) {
		score.bon++;
		marqueurs.truc = "Bonne reponse!";
	} else {
		score.mauvais++;
		marqueurs.truc = "Mauvaise reponse la reponse était "+resultat;
	}

	contenu_fichier = JSON.stringify(score);
	fs.writeFileSync("score.json", contenu_fichier, 'utf-8');
	
	console.log(score);

	page = fs.readFileSync('resultat.html', 'utf-8');

	/*min= 15;
	max = 20;

	contenu_fichier = fs.readFileSync("allumette.json",'utf-8');
	allumette = JSON.parse(contenu_fichier);

	nb_allumettes = Math.round(Math.random() * (max-min) +min);
	console.log(nb_allumettes);

	allumette.nb_allumettes  = nb_allumettes;

	contenu_fichier = JSON.stringify(allumette);
	fs.writeFileSync("allumette.json",contenu_fichier ,'utf-8');*/

	marqueurs.calcul = calcul;
	marqueurs.bon = score.bon;
	marqueurs.mauvais = score.mauvais;
	marqueurs.reponse = query.reponse;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
