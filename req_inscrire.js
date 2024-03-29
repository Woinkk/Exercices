//=========================================================================
// Traitement de "req_inscrire"
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
	let nouveauMembre;
	let contenu_fichier;
	let listeMembres;
	let i;
	let trouve;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while (i < listeMembres.length && trouve === false) {
		if (listeMembres[i].pseudo === query.pseudo) {
			trouve = true;
		}
		i++;
	}

	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES

	if (trouve === false) {
		nouveauMembre = {};
		nouveauMembre.pseudo = query.pseudo;
		nouveauMembre.password = query.password;
		listeMembres[listeMembres.length] = nouveauMembre;

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
	}


	// ON RENVOIT UNE PAGE HTML 

	if (trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION

		page = fs.readFileSync('modele_confirmation_inscription.html', 'UTF-8');

		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.password = query.password;
		page = page.supplant(marqueurs);
	}

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
