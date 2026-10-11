# Zazimo — Cahier des charges

**Version :** 0.1  
**Statut :** spécification initiale, à valider par étapes.

## 1. Objectif

Créer une application éducative ludique pour les jeunes enfants. Elle doit aider à découvrir et tracer les lettres et les nombres, tout en permettant aux adultes responsables d'adapter la difficulté, les récompenses et les stimulations sensorielles.

Zazimo doit être utilisable en ligne et hors ligne. Les activités éducatives essentielles ne doivent pas dépendre d'un service distant.

## 2. Public et accessibilité

- Enfants en âge d'apprentissage des premières lettres et des nombres.
- Expérience accessible à différents profils d'apprentissage.
- Interface tactile prioritaire, avec prise en charge de la souris et du stylet.
- Grands éléments interactifs, instructions simples et faible charge visuelle.
- Aucun message culpabilisant en cas d'erreur.
- Sons, animations et effets de célébration désactivables indépendamment.

## 3. Plateformes visées

- Web.
- Téléphones et tablettes Android.
- iPhone et iPad.
- Windows.
- Linux.

La stratégie technique et la méthode de distribution de chaque plateforme doivent être validées par un prototype et des tests réels avant d'être figées.

## 4. Exercices numériques

### 4.1 Nombres

- Plage prévue : 0 à 5 000 inclusivement.
- Ordre séquentiel, aléatoire ou sélection personnalisée.
- Démonstration du tracé.
- Modes guidé et libre.
- Vérification du geste avec une tolérance adaptée aux mouvements d'un jeune enfant.
- Aide progressive et possibilité de reprendre l'exercice.

### 4.2 Lettres

- Lettres A à Z, majuscules et minuscules.
- Ordre alphabétique, aléatoire ou sélection personnalisée.
- Démonstration du tracé.
- Prononciation en français.
- Modes guidé et libre.
- Validation tolérante du geste.

## 5. Récompenses et défis

- Récompense après une réussite : animation, son, étoile ou médaille, selon les paramètres.
- Défis configurables, par exemple 3 ou 5 réussites, ou un nombre personnalisé.
- Récompense spéciale à la fin d'un défi.
- L'éducateur choisit le comportement en cas d'erreur : indice, démonstration ou nouvel essai.
- La progression ne doit pas être effacée par une erreur, sauf règle explicitement choisie par l'éducateur.
- Le système ne doit pas bloquer l'enfant indéfiniment sur un exercice.

## 6. Modes sensoriels

### Mode Énergie
Préréglage avec couleurs vives, personnages expressifs et célébrations animées.

### Mode Sérénité
Préréglage avec palette plus douce, mouvements limités et transitions prévisibles.

Les deux préréglages restent personnalisables. Volume, sons, animations, contraste et taille des caractères doivent être réglables.

### Thème visuel personnalisable
Dans les paramètres de l'éducateur, ajouter un choix d'univers visuel :
- Garçon.
- Fille.
- Mixte.
- Neutre.

Ces choix servent uniquement de points de départ visuels (palette, ambiance, illustrations et personnages originaux). Aucun exercice, capacité, récompense ou niveau ne doit être réservé à un genre. L'éducateur ou l'enfant peut changer de thème à tout moment; les quatre options doivent rester accueillantes et accessibles, sans imposer de stéréotypes de couleurs, d'intérêts ou de capacités. Prévoir une option de personnalisation plus poussée ultérieurement.

## 7. Espace éducateur

L'espace éducateur doit être protégé contre les ouvertures et modifications accidentelles par l'enfant. Il permettra progressivement de configurer :

- Type et plage d'exercices.
- Ordre séquentiel ou aléatoire.
- Niveau de guidage.
- Nombre de réussites pour les défis.
- Récompenses et paramètres sensoriels.
- Thème visuel : garçon, fille, mixte ou neutre.
- Profils locaux et suivi facultatif des séances.

Les résultats servent au suivi des activités et ne doivent pas être présentés comme un diagnostic.

## 8. Fiches et cahiers imprimables

Les deux fonctions sont requises :

### Fiche à la demande
L'éducateur choisit une lettre, un nombre, une plage ou une série et génère une fiche.

### Cahier complet
Possibilité de générer un cahier de plusieurs pages, notamment 10, 20 ou 50 pages selon les exercices choisis.

Paramètres :
- Formats Letter et A4.
- Portrait et paysage.
- Noir et blanc ou couleur.
- Niveaux « Découverte », « Entraînement » et « Autonomie ».
- Pointillés, flèches, modèles et lignes d'écriture.
- Titre et prénom facultatifs.
- Export PDF et impression locale.

Les documents doivent rester lisibles en noir et blanc et limiter l'encre utilisée.

## 9. Fonctionnement en ligne et hors ligne

### Hors ligne
Les exercices, tracés, démonstrations, sons intégrés, récompenses, paramètres locaux et outils d'impression doivent rester disponibles sans connexion.

### En ligne
Des fonctions additionnelles pourront être proposées : mises à jour, téléchargement volontaire de contenus ou synchronisation entre appareils. Ces fonctions devront être spécifiées séparément.

Une perte de connexion ne doit pas effacer la progression locale ni interrompre une activité essentielle. Toute synchronisation éventuelle devra préciser le consentement, les données transférées et la résolution des conflits.

## 10. Confidentialité

- Stockage local par défaut.
- Aucun compte en ligne obligatoire pour les exercices essentiels.
- Collecte et transfert de données limités au strict nécessaire.
- Toute fonction de synchronisation ou de partage doit être documentée et activée explicitement.

## 11. Identité visuelle et audio

Créer un logo et des personnages originaux. L'ambiance peut être colorée, chaleureuse et ludique, mais les personnages, logos, musiques et sons d'autres franchises ne doivent pas être reproduits sans autorisation.

## 12. Architecture — hypothèses à vérifier

Pistes initiales : HTML, CSS, JavaScript, Canvas, événements Pointer, Go, Wails, stockage local structuré et service worker pour le Web hors ligne. Le choix définitif dépendra des résultats du prototype et des essais multiplateformes.

## 13. Critères de qualité

- Réactivité et précision du tracé au doigt.
- Zones tactiles adaptées aux petits écrans.
- Fonctionnement hors ligne vérifié.
- Aucune perte de progression lors d'une coupure réseau.
- Impression correcte en Letter et A4.
- Sons et animations désactivables.
- Tests de non-régression après chaque modification.
- Documentation mise à jour avec l'état réel des fonctionnalités.

## 14. Hors périmètre de la première maquette

- Synchronisation entre appareils.
- Reconnaissance automatique d'écriture manuscrite sur papier.
- Catalogue en ligne complexe de contenus.
- Fonctions nécessitant obligatoirement un compte distant.

Ces éléments pourront être réévalués après validation du prototype.
