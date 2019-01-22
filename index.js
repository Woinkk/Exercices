//=========================================================================
// Site WEB demo PI
// Auteurs : P. Thiré & T. Kerbrat
// Version : 12/09/2018
//=========================================================================

"use strict";
const http = require("http");
const url = require("url");
let mon_serveur;
let port;

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

const req_commencer = require("./req_commencer.js");
const req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
const req_inscrire = require("./req_inscrire.js");
const req_identifier = require("./req_identifier.js");
const req_calculer = require("./req_calculer.js");
const req_ajout_list = require("./req_ajout_list.js");
const req_suppr_list = require("./req_suppr_list.js");
const req_allumette = require("./req_allumette.js");
const req_retirer = require("./req_retirer.js");
const req_verifier = require("./req_verifier.js");
const req_continuer = require("./req_continuer.js");


const req_static = require("./req_statique.js");
const req_erreur = require("./req_erreur.js");

//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

let traite_requete = function (req, res) {

	let ressource;
	let requete;
	let pathname;;
	let query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_calculer':
				req_calculer(req, res, query);
				break;
			case '/req_ajout_list':
				req_ajout_list(req, res, query);
				break;
			case '/req_allumette':
				req_allumette(req, res, query);
				break;
			case '/req_retirer':
				req_retirer(req, res, query);
				break;
			case '/req_suppr_list':
				req_suppr_list(req, res, query);
				break;
			case '/req_verifier':
				req_verifier(req, res, query);
				break;
			case '/req_continuer':
				req_continuer(req, res, query);
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

mon_serveur = http.createServer(traite_requete);
port = 5000;
//port = process.argv[2];
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
