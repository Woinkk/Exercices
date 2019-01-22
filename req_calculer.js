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
	let calcule;
	let resultat = 0;
	let nb1 = 0;
	let operateur;
	let nb2 = 0;
	let result;
	let historique;
	let contenu_fichier;
	let hist;
	let i;

	if (query.operateur ==="+") {
		resultat = query.nombre1*1 + query.nombre2*1
	} else if (query.operateur === "*") {
		resultat = query.nombre1 * query.nombre2
	} else if (query.operateur === "-") {
		resultat = query.nombre1 - query.nombre2
	} else  {
		resultat = query.nombre1 / query.nombre2
	}

	/*nb1 = query.nombre1;
	Number(nb1)
	operateur = query.operateur;
	nb2 = query.nombre2;
	Number(nb2)
	result = nb1 + nb2
	console.log(result)
	console.log(nb1+nb2)
	resultat = query.nombre1*1 + query.operateur + query.nombre2*1;*/

	marqueurs = {};
	marqueurs.calcule = "";

	calcule = query.nombre1 + query.operateur + query.nombre2+" = "+resultat;
	
	contenu_fichier = fs.readFileSync("historique.json", 'utf-8');
	hist = JSON.parse(contenu_fichier);
	
	historique = "";
	hist.push(calcule);

	contenu_fichier = JSON.stringify(hist);
	fs.writeFileSync("historique.json", contenu_fichier, 'utf-8');

	for (i = 0; i < hist.length; i++){
		historique += hist[i]+"<br>";
	}
	console.log(hist);


	page = fs.readFileSync("modele_accueil_membre.html", 'utf-8');
	marqueurs.calcule = historique; 
	marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
