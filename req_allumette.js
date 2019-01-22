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
	
	page = fs.readFileSync("allumette.html", 'utf-8');
	

	/*marqueurs.erreur = "";
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);*/

	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write(page);
	res.end();
};
//--------------------------------------------------------------------------

module.exports = trait;
