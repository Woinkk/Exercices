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
	let contenu_fichier;
	let i;
	let nb_allumettes;
	let allumette;
	let html_allu;
	let retirer;

	retirer = Number(query.retirer);

	marqueurs = {}

	contenu_fichier = fs.readFileSync("allumette.json", 'utf-8');
	allumette = JSON.parse(contenu_fichier);

	if (query.abandonner === noob) {
		if (allumette.tour === 1) {
			allumette.vainqueur = 2;
			allumette.victoire[1]++
		} else {
			allumette.vainqueur = 1;
			allumette.victoire[0]++
		}
	}

	if (allumette.nb_allumettes === 0) {
		page = fs.readFileSync("gagnant.html", 'utf-8');
		console.log("1")
		if (allumette.tour === 1) {
			allumette.vainqueur = 2;
			allumette.victoire[1]++
		} else {
			allumette.vainqueur = 1;
			allumette.victoire[0]++
		}
	} else if (allumette.nb_allumettes - retirer <= 0) {
		page = fs.readFileSync("gagnant.html", 'utf-8');
		console.log("2")
		if (allumette.tour === 1) {
			allumette.vainqueur = 2;
			allumette.victoire[1]++
		} else {
			allumette.vainqueur = 1;
			allumette.victoire[0]++
		}
	} else if (allumette.nb_allumettes - retirer === 1) {
		page = fs.readFileSync("gagnant.html", 'utf-8');
		console.log("3");
		if (allumette.tour === 1) {
			allumette.vainqueur = 1;
			allumette.victoire[0]++
		} else {
		allumette.vainqueur = 2;
		allumette.victoire[1]++
		}
	} else {	
		page = fs.readFileSync("allumette.html", 'utf-8');
	}

	allumette.nb_allumettes -= query.retirer;

	if (allumette.tour === 1) {
		allumette.tour = 2
	} else {
		allumette.tour = 1
	}

	contenu_fichier = JSON.stringify(allumette);
	fs.writeFileSync("allumette.json", contenu_fichier, 'utf-8');


	html_allu = "";
	for (i = 0; i < allumette.nb_allumettes; i++ ) {
		html_allu += "<img src='allumette.PNG'>";
	}	

		contenu_fichier = fs.readFileSync("allumette.json",'utf-8');
		allumette = JSON.parse(contenu_fichier);



	contenu_fichier = JSON.stringify(allumette);
	fs.writeFileSync("allumette.json", contenu_fichier, 'utf-8');


	marqueurs.tour = allumette.tour;
	marqueurs.vainqueur = allumette.vainqueur;
	marqueurs.victoire1 = allumette.victoire[0];
	marqueurs.victoire2 = allumette.victoire[1];
	marqueurs.allumettes = html_allu;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
