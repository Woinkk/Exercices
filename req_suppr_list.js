//=========================================================================
// Traitement de "req_identifier"
// Auteurs : P. Thiré & T. Kerbrat
// Version : 12/09/2018
//=========================================================================
"use strict";

const fs = require("fs");
require('remedial');

let trait = function (req, res, query) {

	let marqueurs;
	let pseudo;
	let password;
	let page;
	let membre;
	let contenu_fichier;
	let listeMembres;
	let i;
	let trouve;
	let listee;
	let html_liste;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("liste.json", 'utf-8');
	listee = JSON.parse(contenu_fichier);
	
	console.log(listee);

	console.log(query.element)

	listee.splice(query.element, 1);
	console.log(listee)
	
	contenu_fichier = JSON.stringify(listee)
	fs.writeFileSync("liste.json",contenu_fichier, 'utf-8');
	
	html_liste = "";

	for (i = 0; i < listee.length; i++){
		console.log("test")
		html_liste += "<li><button name=element value="+i+">-</button>"+listee[i]+"</li>";
	}
	
	page = fs.readFileSync('modele_list_todo.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.liste = html_liste;
	page = page.supplant(marqueurs);

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
